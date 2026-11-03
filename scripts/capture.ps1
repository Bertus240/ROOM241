$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$artDir = "C:\Users\bertu\.gemini\antigravity\brain\299bcbae-2faa-455e-bf92-9db6c31028d9"

$targets = @(
  @{ name="capture_accueil_desktop.png"; url="http://127.0.0.1:5173/"; w=1440; h=900 },
  @{ name="capture_accueil_mobile.png"; url="http://127.0.0.1:5173/"; w=390; h=844 },
  @{ name="capture_galerie_desktop.png"; url="http://127.0.0.1:5173/projets"; w=1440; h=900 },
  @{ name="capture_galerie_mobile.png"; url="http://127.0.0.1:5173/projets"; w=390; h=844 },
  @{ name="capture_parcours_desktop.png"; url="http://127.0.0.1:5173/parcours"; w=1440; h=900 },
  @{ name="capture_parcours_mobile.png"; url="http://127.0.0.1:5173/parcours"; w=390; h=844 },
  @{ name="capture_univers_perso_desktop.png"; url="http://127.0.0.1:5173/hors-cadre"; w=1440; h=900 },
  @{ name="capture_univers_perso_mobile.png"; url="http://127.0.0.1:5173/hors-cadre"; w=390; h=844 },
  @{ name="capture_contact_hors_cadre_desktop.png"; url="http://127.0.0.1:5173/hors-cadre#contact"; w=1440; h=900 },
  @{ name="capture_mentions_legales.png"; url="http://127.0.0.1:5173/mentions-legales"; w=1440; h=900 },
  @{ name="capture_politique_confidentialite.png"; url="http://127.0.0.1:5173/politique-de-confidentialite"; w=1440; h=900 }
)

foreach ($t in $targets) {
  $out = Join-Path $artDir $t.name
  $tmpUser = Join-Path $env:TEMP ("edge_prof_" + [System.Guid]::NewGuid().ToString().Substring(0,8))
  Write-Host "Capturing $($t.name)..."
  $args = @(
    "--headless=new",
    "--user-data-dir=$tmpUser",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--window-size=$($t.w),$($t.h)",
    "--screenshot=$out",
    $t.url
  )
  $p = Start-Process -FilePath $edge -ArgumentList $args -PassThru -NoNewWindow
  $exited = $p.WaitForExit(10000)
  if (-not $exited) {
    Write-Host "Timeout reached for $($t.name), terminating process..."
    $p.Kill()
  }
  Remove-Item -Recurse -Force $tmpUser -ErrorAction SilentlyContinue
  if (Test-Path $out) {
    Write-Host "  -> OK: $($t.name) ($((Get-Item $out).Length) bytes)"
  } else {
    Write-Host "  -> FAILED: $($t.name)"
  }
}

Write-Host "ALL_CAPTURES_COMPLETED"
