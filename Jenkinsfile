pipeline {
  agent any
  options { timestamps() }

  environment {
    FRONTEND_REPO = "jaimeteto/survey-frontend"
    BACKEND_REPO  = "jaimeteto/survey-backend"
    VERSION       = "hw3"
    NS            = "hw3"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build & Push Docker images') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub',
          usernameVariable: 'DHU',
          passwordVariable: 'DHP'
        )]) {
          sh '''
            echo "$DHP" | docker login -u "$DHU" --password-stdin

            docker build -t ${BACKEND_REPO}:${VERSION} ./backend
            docker push ${BACKEND_REPO}:${VERSION}

            docker build -t ${FRONTEND_REPO}:${VERSION} ./frontend
            docker push ${FRONTEND_REPO}:${VERSION}

            docker logout || true
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          kubectl get ns ${NS} || kubectl create namespace ${NS}
          kubectl -n ${NS} apply -f k8s/
          kubectl -n ${NS} rollout status deploy/survey-backend --timeout=180s
          kubectl -n ${NS} rollout status deploy/survey-frontend --timeout=180s
        '''
      }
    }
  }
}
