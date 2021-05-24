if(process.env.NODE_ENV !== 'producton'){
    require('dotenv')
}

const sendgrid = require('sendgrid'),
    helper = sendgrid.mail,
    key = process.env.SEND_GRID_KEY



class Mailer extends helper.Mailer{



    constructor({subject, recipients}, content){
        super()

        this.sg = sendgrid(key)
        this.from_email = new helper.Email('no-reply@campaign.com')
        this.subject = subject
        this.body = new helper.Content('text/html', content)
        this.recipients = new formatAddress(recipients)

        this.addContent(this.body)
        this.addClickTracking()
        this.addRecipients()
    }

    addRecipients(){
        const personalize = new helper.Personalization()
        this.recipients.map(recipient=>{
            personalize.addTo(recipient)
        })

        this.addPersonalization(personalize)
    }

    addClickTracking(){
        const trackSettings =  new helper.TrackSettings()
        const clickSetting =  new helper.ClickSettings(true, true)

        trackSettings.setClickTracking(clickSetting)
        this.addTrackSettings(trackSettings)
    }

    formatAddress(recipients){
        return recipients.map(email=>{
            return new helper.Email(email)
        })
    }

    async send(){
        const request = this.sgApi.emptyRequest({
            method: "POST",
            path: '/v3/mail/send',
            body: this.toJSON()
        })

     const response = await this.sgApi.API(response)
     return response
    }


}    


module.exports = Mailer