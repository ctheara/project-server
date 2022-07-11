node {
    
    stage('Checkout') {
        git branch: 'main', url: 'https://github.com/foxwas/tldp-team0-project-tldp-server.git'
    }
    
    stage('Install Dependencies') {
        sh 'npm install'
    }
    
    stage('Run') {
        sh 'node server &'
    }
    
    stage('Postman Tests') {
        sh 'npx newman run Customer.postman_collection.json'
    }
}
