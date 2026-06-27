
@echo off

echo ===== START =====

cd /d C:\PlaywriteWorkspace\Automation_testing

echo Node version:
node -v

echo NPM version:
npm -v

echo Installing dependencies
npm install

echo Installing Playwright browsers
npx playwright install

echo Cleaning old results
rmdir /s /q test-results 2>nul

echo Running tests
npx playwright test --reporter=list

echo ===== END =====
