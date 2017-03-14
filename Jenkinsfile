node('lsk-example') {
    stage('Pulling') {
        sh 'node -v'
        sh 'yarn prune'
        sh 'yarn install'
    }

    stage('Build') {
        sh 'yarn run build'
    }

    // stage('Docker build') {
    //   dockerNode(image: 'node:7.1', sideContainers: ['']) {
    //       withDockerContainer('node:7.1') {
    //           sh 'yarn run build'
    //           // ...
    //           withDockerRegistry([
    //             credentialsId: 'db670754-6b99-4a82-8b9c-67daa30e7c87',
    //             url: 'https://hq.mgbeta.ru:5000/'
    //           ]) {
                  
    //           }
    //       }
    //   }
    // }

    stage('Deploy') {
        sh 'cd ./build && NODE_ENV=production yarn install'
        sh 'cd .. && rsync -avz ./build/* s3:/projects/lsk/app'
        sh "ssh s3 'cd /projects/lsk && docker-compose stop && docker-compose up'"
    }
}