pipeline {

agent { dockerfile true }

   tools {
       nodejs "nodejs12x"
    }

    environment{
       CI = 'true'
   }

    stages {
       stage('Build') { 
            steps {
                sh 'npm -version' 
                sh 'npm install' 
                sh 'npm run buildDev' 

                println "Se termino de instalar"    
                sh 'ls'
            }
        }
        stage('Front-end-Docker') { 
            steps {
                //sh 'npm start' 
            }
        }           
        
    }
}
