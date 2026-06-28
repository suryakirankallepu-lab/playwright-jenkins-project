
pipeline {
    
agent {
    docker {
        image 'node:18'
    }
}


    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/suryakirankallepu-lab/playwright-jenkins-project.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            parallel {

                stage('Chromium') {
                    steps {
                        sh 'npx playwright test --project=chromium'
                    }
                }

                stage('Firefox') {
                    steps {
                        sh 'npx playwright test --project=firefox'
                    }
                }
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }
}
