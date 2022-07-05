import Registration from '../models/registration.js'
import dataCleaner from '../utilities/data-cleaner.js'

const registrationController = {
  
  // GET /api/customers/
  getAllRegistrations: function(req, res) {
    Registration.find({}, '', function(err, registrations){
      if(err|| !registrations || registrations.length == 0 ) {
        res.sendStatus(404)
      } else {
        res.status(200).send(dataCleaner.cleanRegistrations(registrations))
      }
    }) 
  }, 

  // GET /api/customers/:customer_id
  getRegistrationByID: function(req, res) {
    Registration.findOne({'Registration_ID': req.params.registration_id}, '', function(err, registration){
      if(err || ! registration) {
        res.sendStatus(404)
      } else {
        res.status(200).send(dataCleaner.cleanRegistration(registration))
      }
    })
  },

  // POST /api/customers/
  postRegistration: function(req, res) {
    Registration.create({ EVENT_ID: req.body.event_id, CUSTOMER_ID: req.body.customer_id, REGISTRATION_DATE: req.body.registration_date, NOTES: req.body.notes}).then(
      (r) => { 
        res.location(`/api/registrations/${r.REGISTRATION_ID}`)
        res.sendStatus(201)
      }, // OK
      () => res.sendStatus(500) // Error
    )
  },

  // DELETE /api/customers/:customer_id
  deleteRegistrationByID: function(req, res) {
    Registration.deleteOne({'REGISTRATION_ID': req.params.registration_id}, function(err){
      if(err) {
        res.sendStatus(500)
      } else {
        res.sendStatus(200)
      }
    })
  }

} 

export default registrationController