pipeline {
  agent any
  options { timestamps() }

  environment {
    // Docker Hub repos for HW3
    BACKEND_REPO  = "jaimeteto/survey-backend"
    FRONTEND_REPO = "jaimeteto/survey-frontend"

    // Simple version tag for HW3
    VERSION = "hw3"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm  // pulls your swe645-hw3 repo
      }
    }

    stage('Build Docker images') {
      steps {
        sh '''
          echo "Building backend image: ${BACKEND_REPO}:${VERSION}"
          docker build -t ${BACKEND_REPO}:${VERSION} ./backend

          echo "Building frontend image: ${FRONTEND_REPO}:${VERSION}"
          docker build -t ${FRONTEND_REPO}:${VERSION} ./frontend
        '''
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub',        // same creds ID you used in HW2
          usernameVariable: 'DHU',
          passwordVariable: 'DHP'
        )]) {
          sh '''
            echo "$DHP" | docker login -u "$DHU" --password-stdin

            echo "Pushing backend image: ${BACKEND_REPO}:${VERSION}"
            docker push ${BACKEND_REPO}:${VERSION}

            echo "Pushing frontend image: ${FRONTEND_REPO}:${VERSION}"
            docker push ${FRONTEND_REPO}:${VERSION}

            docker logout || true
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([file(credentialsId: 'kubeconfig-hw3', variable: 'KCFG')]) {
          sh '''
            set -e
            echo "Using kubeconfig: $KCFG"
            export KUBECONFIG="$KCFG"

            kubectl config view
            kubectl get nodes

            NS=hw3
            echo "Ensuring namespace $NS exists..."
            kubectl get ns $NS || kubectl create namespace $NS

            echo "Applying manifests..."
            kubectl -n $NS apply -f k8s/

            echo "Waiting for rollouts..."
            kubectl -n $NS rollout status deploy/survey-backend --timeout=180s || true
            kubectl -n $NS rollout status deploy/survey-frontend --timeout=180s || true
          '''
        }
      }
    }

  } // <-- closes stages block

  post {
    success {
      echo "✅ HW3 pipeline completed successfully (images built, pushed, and deployed to namespace hw3)."
    }
    failure {
      echo "❌ HW3 pipeline failed — check the stage logs above."
    }
  }
}
