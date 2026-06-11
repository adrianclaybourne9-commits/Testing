$ErrorActionPreference = "Stop"

$server = "root@66.116.207.251"
$remotePath = "/var/www/Neudhi23Officialwebsite"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupFile = "/var/www/neudhi23_backup_$timestamp.tar.gz"

Write-Host "1. Creating local archive (deploy.tar.gz)..." -ForegroundColor Cyan
# Using Windows built-in tar to archive files
tar -czf deploy.tar.gz src public package.json package-lock.json next.config.ts postcss.config.mjs eslint.config.mjs tsconfig.json

Write-Host "`n2. Backing up existing files on the VPS..." -ForegroundColor Cyan
Write-Host "You will be prompted for your VPS password: f-]<>wRKT:Nr2i" -ForegroundColor Yellow
ssh -oHostKeyAlgorithms=+ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa $server "tar -czf $backupFile -C /var/www Neudhi23Officialwebsite"

Write-Host "`n3. Uploading new files to VPS..." -ForegroundColor Cyan
Write-Host "You will be prompted for your VPS password again: f-]<>wRKT:Nr2i" -ForegroundColor Yellow
scp -oHostKeyAlgorithms=+ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa deploy.tar.gz "$($server):/var/www/"

Write-Host "`n4. Extracting files and building the project on VPS..." -ForegroundColor Cyan
Write-Host "You will be prompted for your VPS password one last time: f-]<>wRKT:Nr2i" -ForegroundColor Yellow
$remoteCommands = @"
cd /var/www/Neudhi23Officialwebsite
# Keep node_modules intact to speed up install, just extract over existing files
tar -xzf /var/www/deploy.tar.gz -C /var/www/Neudhi23Officialwebsite
npm ci
npm run build
pm2 restart neudhi23-website
rm /var/www/deploy.tar.gz
"@

ssh -oHostKeyAlgorithms=+ssh-rsa -oPubkeyAcceptedAlgorithms=+ssh-rsa $server $remoteCommands

Write-Host "`nDeployment process completed successfully!" -ForegroundColor Green
Write-Host "Clean up local deploy file..."
Remove-Item deploy.tar.gz
