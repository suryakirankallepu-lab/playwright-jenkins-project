
pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
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
                script {
                    if (isUnix()) {
                        sh '''
                            echo "Running on Linux/Docker"
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

        stage('Run Tests in Parallel') {
            parallel {

                stage('Chromium Tests') {
                    steps {
                        script {
                            if (isUnix()) {
                                sh 'npx playwright test --project=chromium'
                            } else {
                                bat 'npx playwright test --project=chromium'
                            }
                        }
                    }
                }

                stage('Firefox Tests') {
                    steps {
                        script {
                            if (isUnix()) {
                                sh 'npx playwright test --project=firefox'
                            } else {
                                bat 'npx playwright test --project=firefox'
                            }
                        }
                    }
                }

                /*
                Optional:
                stage('WebKit Tests') {
                    steps {
                        script {
                            if (isUnix()) {
                                sh 'npx playwright test --project=webkit'
                            } else {
                                bat 'npx playwright test --project=webkit'
                            }
                        }
                    }
                }
                */
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
            echo '✅ Tests Passed Successfully'
        }

        failure {
            echo '❌ Tests Failed'
        }

        cleanup {
            cleanWs()
        }
    }
}