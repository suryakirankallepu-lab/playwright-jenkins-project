pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/suryakirankallepu-lab/playwright-jenkins-project.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Run Tests') {
            steps {
                script {

                    if (isUnix()) {

                        sh '''
                        echo "Running inside Docker Jenkins"

                        docker run --rm \
                        mcr.microsoft.com/playwright:v1.45.0-focal \
                        bash -c "
                          git clone https://github.com/suryakirankallepu-lab/playwright-jenkins-project.git app &&
                          cd app &&
                          ls -la &&
                          npm install &&
                          npx playwright test
                        "
                        '''

                    } else {

                        bat '''
                        echo Running on Windows Jenkins

                        npm install
                        npx playwright install
                        npx playwright test
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo '✅ SUCCESS'
        }
        failure {
            echo '❌ FAILED'
        }
    }
}