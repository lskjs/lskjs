import { Schema } from 'universal-model'

export default (ctx) => {


  // acl

  const PetWithAcl = applyAcl(Pet, {

  })

  createControllerFromMongooseSchema()


  statics & methods
  // Resourse
  // restful =>
  class PetController {

    findAll() {

    }

    findOne() {

    }

    kill(req) {
      // if (req.user.id !== this.owner) throw '403'
      // errgert
    }
  }

  // MW /pet/123
  req.params.pet = new Pet.findById(123)
  /pet/123/kill
  (req, res) => {
    const pet = req.params.pet;

    pet.applyReq(req)
    //

    ACL ???

    pet.kill()

  }

//client
{
   Pet.findById(123).kill()
}


  const schema = new Schema({
    counter1: {
      type: Number,
    },
    counter2: {
      type: Number,
    },
  })

  schema.statics.removeAll

  // ACL

  // server
  // client ???
  schema.methods.increase = function() {
    this.counter1 += 1;
  }

  //client
  schema.methods.increase = function () {
    fetch('')
  }
  schema.methods.increase = Schema.makeRpc('increase')

  Category.findById(123).increase()

  Category.find({
    qwe: 123
  })
  .limit(10)


  /api/rpc
  {
    model: "Category",
    method: 'find',
    params: {
      qwe: 123
    }
  }



    Category.find({
      qwe: 123
    })
    .limit(10)


  return Sch
}
