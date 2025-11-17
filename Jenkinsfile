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
