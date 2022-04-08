pipeline { 
    agent any
    
    tools { nodejs "nodejs12x" }
    //tools { nodejs "nodejs10x" }
    
    stages {
       stage('Build'){
           steps {
               sh 'npm -version' 
               sh 'npm install' 
               sh 'npm run buildDev'
               println "Se termino de instalar"    
               sh 'cd dist'
               sh 'ls'               
            }
        }
        stage('Run'){
            steps {
               sh 'npm start'      
            }

        }
        
    }
}
