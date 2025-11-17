pipeline {
  agent any
  options { timestamps() }
  environment {
    NS = 'hw3'                   // isolate from HW2
    KCFG_CRED = 'kubeconfig-hw3' // <-- Jenkins Secret file ID
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([file(credentialsId: "${KCFG_CRED}", variable: 'KCFG')]) {
          sh '''
            set -e
            export KUBECONFIG="$KCFG"

            # sanity checks
            kubectl version --short
            kubectl get nodes

            # ensure dedicated namespace
            kubectl get ns ${NS} || kubectl create namespace ${NS}

            # create/update both Deployments + Services (two separate Pods)
            kubectl -n ${NS} apply -f k8s/

            # wait for rollouts (non-fatal timeout so logs still continue)
            kubectl -n ${NS} rollout status deploy/survey-backend --timeout=180s || true
            kubectl -n ${NS} rollout status deploy/survey-frontend --timeout=180s || true
          '''
        }
      }
    }
  }
  post {
    success { echo "✅ HW3 deployed to namespace ${NS}" }
    failure { echo "❌ Deployment failed — check logs" }
  }
}
