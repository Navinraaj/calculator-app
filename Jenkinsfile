pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'calculator-app:${BUILD_ID}'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Building Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Here we assume that Docker can run our tests, or you might use another step
                    sh 'docker run --rm $DOCKER_IMAGE npm test'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Dummy deploy command
                    sh 'echo "Deploying to staging environment..."'
                }
            }
        }
    }
}
