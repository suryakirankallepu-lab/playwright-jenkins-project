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
                        // ✅ Docker Jenkins (Linux)
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
                        // ✅ Windows Jenkins
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

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
