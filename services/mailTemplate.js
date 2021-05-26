let redirect_domain = ''
if(process.env.NODE_ENV === 'production'){
    redirect_domain = 'https://.herokuapp.com/thankyou'
}else{
    redirect_domain = 'http://localhost:2029/thankyou'
}


module.exports = (survey)=>{
    return `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>Your response is highly needed</h3>
                    <p>Please the following question</p>
                    <p>${survey.body}</p>
                    <p><a href=${redirect_domain}>Yes</a>  <a href=${redirect_domain}>No</a><p>
                </div>
            </body>
        </html>
    `;
}