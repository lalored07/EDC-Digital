pipeline { 
    agent any
    
    tools { nodejs "nodejs12x" }
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
             steps {
               sh 'ng serve'      
            }
        }
        
    }
}
