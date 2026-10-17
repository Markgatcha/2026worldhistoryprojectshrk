$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
$out = Join-Path (Split-Path $PSScriptRoot -Parent) 'app/fonts'
New-Item -ItemType Directory -Force -Path $out | Out-Null

# family -> css2 query (latin subset only; we ask for the weights we actually use)
$families = @(
  @{ file = 'abrilfatface';       query = 'Abril+Fatface' },
  @{ file = 'goudybookletter';     query = 'Goudy+Bookletter+1911' },
  @{ file = 'ebgaramond';         query = 'EB+Garamond:ital,wght@0,400;0,500;0,600;1,400' }
)

foreach ($f in $families) {
  $url = "https://fonts.googleapis.com/css2?family=$($f.query)&display=swap"
  $css = (Invoke-WebRequest -Uri $url -UseBasicParsing -Headers @{ 'User-Agent' = $UA }).Content

  # Split into @font-face blocks, keep only the latin subset (the last
  # unicode-range block Google emits for the plain `latin` subset).
  $blocks = [regex]::Matches($css, '@font-face\s*\{[^}]*\}')
  foreach ($b in $blocks) {
    $t = $b.Value
    $range = [regex]::Match($t, 'unicode-range:\s*([^;]+);').Groups[1].Value
    # `latin` is U+0000-00FF; latin-ext and others are excluded deliberately.
    if ($range -notmatch 'U\+0000-00FF') { continue }

    $style = if ($t -match 'font-style:\s*italic') { 'italic' } else { 'roman' }
    $weight = [regex]::Match($t, 'font-weight:\s*([0-9 ]+)').Groups[1].Value.Trim() -replace ' ', '-'
    $src = [regex]::Match($t, 'url\((https://[^)]+\.woff2)\)').Groups[1].Value
    if (-not $src) { continue }

    $name = "$($f.file)-$weight-$style.woff2"
    $dest = Join-Path $out $name
    Invoke-WebRequest -Uri $src -UseBasicParsing -Headers @{ 'User-Agent' = $UA } -OutFile $dest
    Write-Output ("{0,-42} {1,7} bytes" -f $name, (Get-Item $dest).Length)
  }
}