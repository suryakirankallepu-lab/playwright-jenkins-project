pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/suryakirankallepu-lab/playwright-jenkins-project.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            echo "Running on Docker/Linux"
                            
                            # install node only if missing
                            if ! command -v node > /dev/null; then
                                echo "Installing Node..."
                                apt-get update
                                apt-get install -y nodejs npm
                            fi

                            node -v
                            npm -v
                            npm install
                            npx playwright install
                        '''
                    } else {
                        bat '''
                            echo Running on Windows
                            node -v
                            npm -v
                            npm install
                            npx playwright install
                        '''
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright test'
                    } else {
                        bat 'npx playwright test'
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

    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo '✅ Tests Passed'
        }
        failure {
            echo '❌ Tests Failed'
        }
    }
}