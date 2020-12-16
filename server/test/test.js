
// article reference = https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai

let mongoose = require("mongoose");
const path=require('path')
let User = require('../model/index');

let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../server');

//Our parent block
describe('testBlock', () => {
   describe('/GET media', () => {
      it('it should GET all the podcast', (done) => {
      chai.request(server)
         .get('/media')
         .end((err, res) => {
               (res).should.have.status(200);
               (res.body).should.be.a('object');
               (res.body.podcasts.length).should.be.eql(1);
               done();
            });
         });
   });
      describe('/GET message', () => {
      it('it should GET a message', (done) => {
      chai.request(server)
            .get('/message')
            .end((err, res) => {
                  (res).should.have.status(200);
                  (res.body).should.be.a('object');
                  done();
               });
            });
      });
      describe('/GET dashboard', () => {
         it('it should GET a message', (done) => {
         chai.request(server)
               .get('/')
               .end((err, res) => {
                     (res).should.have.status(200);
                     (res.body).should.be.a('object');
                     done();
                  });
               });
         });


   //      beforeEach((done) => { //Before each test we empty the database
   //       User.remove({}, (err) => {
   //          done();
   //       });
   //   });
  
   
   describe('/GET users', () => {
       it('it should GET all the users', (done) => {
         chai.request(server)
             .get('/users')
             .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
               done();
             });
       });
   });
  
   describe('/get single user with given id', () => {
      it('it should fetch single user', (done) => {
        chai.request(server)
            .get('/user/5fd897de1f75162668368856')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });
  });
  
   describe('testing add user route', () => {
      it('it should add user', (done) => {
         let user = {
             name: "test",
             email: "email@gmail.com",
             age: "22",
             phone:"03342621002"
         }
         chai.request(server)
         .post('/addUser')
         .send(user)
         .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').eql('success');
            res.body.user.should.have.property('_id');
            res.body.user.should.have.property('name');
            res.body.user.should.have.property('email');
            res.body.user.should.have.property('age');
            res.body.user.should.have.property('phone');
            done();
         });
      }); 
   });
   
 

   //chnage id to existing user
   // describe('/delete user with given id', () => {
   //     it('it should delete single user', (done) => {
   //       chai.request(server)
   //           .get('/deleteUser/5fd89817fef3ed306037e2a5')
   //           .end((err, res) => {
   //                 res.should.have.status(200);
   //                 res.body.should.be.a('object');
   //                 res.body.user.should.have.property('name');
   //                 res.body.user.should.have.property('email').eql("email786@gmail.com");
   //             done();
   //           });
   //     });
   // });
  
   let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXphaXIiLCJ0b2tlbk5vIjoiMTE1OCIsImlhdCI6MTYwODA5NjY5NSwiZXhwIjoxNjA4MTI5MDk1fQ.Z3myZPNpNGelWbQ4SInwaqp7TZlkSe55xogBzL5gqKQ'
   let testFilesDir=path.join(__dirname,'../../public/testFiles/image1.jpg')
  
   describe('/test route with authentication', () => {
      it('it should give us a token in response', (done) => {
        chai.request(server)
            .get('/testToken')
            .set({ Authorization: "Bearer "+token})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('user')
                  res.body.should.have.property('tokenNo')
              done();
            });
      });
  });
  

   describe('/test multipart data', () => {
      it('it should save user with image and user information .', (done) => {
         let user = {
            name: "multipart",
            email:"multipart@gmail.com"
        }
      chai.request(server)
            .post('/multipartData')
            .set({ Authorization: "Bearer "+token})
            .field('name', 'test multipart')
            .field('email','test@gmail.com')
            .attach('avatar', testFilesDir)
            .end((err, res) => {
               if(err){
                  console.log(err)
               }else{
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('msg').eql('success')
               }
            done();
            });
      });
   });

});
