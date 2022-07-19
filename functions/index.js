const admin = require("firebase-admin");
admin.initializeApp();
const functions = require ("firebase-functions");
const db = require("@firebase/database");
const nodemailer = require("nodemailer");

const fs = require("fs");
const handlebars = require('handlebars');

const filePath1 = './email/application-submitted.html';
const filePath2 = './email/omicss-submitted.html';
source = '';

exports.sendEmailNotification = functions.database.ref('Applications/{listingID}/wwww_Responses/{appID}').onCreate((snap, ctx)=> {
  const data = snap.val();
  const keys = Object.keys(snap.toJSON());
  const params = ctx.params.listingID;


  const positions = {
    ['20220116']: 'Software Engineer',
    ['20220117']: 'Bioinformatician/Life Scientist',
    ['20220301']: 'Bioinformatics Researcher',
    ['20220302']: 'System Administrator',
    ['20220415']: 'Communications & marketing manager',
    ['20220614_']: 'OMICSS-2022',
    ['20220640']: 'Data Scientist, Biostatistician, Bioinformatician',
    ['20220641']: 'Administrative Assistant'
  };
  if(params==='20220614_'){
    this.source = fs.readFileSync(filePath2, 'utf-8').toString();
  } else {
    this.source = fs.readFileSync(filePath1, 'utf-8').toString();
  }
  const template = handlebars.compile(this.source);
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@abi.am',
      pass: 'GsuiteADMIN2022!'
    }
  });
  let replacements = {};
  const questions = {
    Name: 'Your Name',
    Affiliation: 'Your current affiliation (organization, position, and/or university)',
    Email: 'Your Email',
    Phone: 'Your Phone Number',
    Goals: 'What are your short and long-term career plans?',
    ['Experience with Users']: 'Have you ever interacted with users and provided instructions on how to efficiently use server resources?',
    Motivation: 'What is your motivation to apply for this job?',
    ['How you found out about this opportunity']: 'How did you find out about this opportunity?',
    ['Professional Background']: 'Describe your professional background.',
    ['Supercomputers in Sweden and Germany']: 'What would you like to learn at the supercomputing centers in Sweden and Germany when given the\n' +
    '              chance?',
    ['Willingness to Learn']: 'Are you willing to learn the peculiarities of bioinformatics software support?',
    ['English Proficiency']: 'On a scale of 1-5, how would you rate your English proficiency?',
    ['Armenian Proficiency']: 'On a scale of 1-5, how would you rate your Armenian proficiency?',
    ['Previous Work Examples']: 'Optional: If you have any previous examples of SM Platform or Website management, please attach the URLs below.',
    ['Expectations']: 'Why are you interested in the offered position? What are your expectations from the internship? How does it\n' +
    '              relate to your career goals?',
    ['Topic in Life Science']: 'Describe a topic in life sciences that is of particular interest to you. Have you ever been engaged in a\n' +
    '              research project? If yes, what was it about?',
    ['Why ABI']: 'What do you think is the Armenian Bioinformatics Institute’s mission? Why have you chosen to apply to the Armenian Bioinformatics Institute?',
    ['Proposed Changes']: 'Looking at the ABI website and social media pages, what would you change to optimize the user experience, to engage students, researchers and/or donors?',
    ['Anything Else']: 'Is there anything else you would like to tell us about you?',
    ['Attend Bootcamp?']: 'If you get selected for the bootcamp, will you be able to attend it?',
    ['Background Field']: 'What background do you come from?',
    ['Benefit']: 'How do you think you will benefit from this summer school?',
    ['Experience Reading Papers']: 'Do you have experience reading scientific papers?',
    ['Laptop']: 'Can you bring your laptop to school with you?',
    ['Last Degree Acquired']: 'What is the last degree you have acquired? (Degree, Year, Institution)',
    ['Other']: 'Please specify.',
    ['Paper Topics Interested']: 'Which topics are most interesting for you?',
    ['Plans']: 'Describe your educational and career-related plans.',
    ['Programming Language of Choice']: 'What is your programming language of choice?',
    ['Time Dedication']: 'Will you be able to dedicate 6-7 hours per day to the school?',
    ['What are you best at']: 'What are you best at?',
    ['Why Bioinformatics']: 'Why are you interested in Bioinformatics?',
    ['Time Commitment']: 'How much time can you commit to the work daily?'
  };
  for(let i  = 0; i<keys.length; i++){
    replacements[keys[i].replace(/\s/g, '')] = questions[keys[i]];
  }

  console.log(questions['Supercomputers in Sweden and Germany']);
  replacements.anelse = data['Anything Else'];
  replacements.bootcamp = data['Attend Bootcamp?'];
  replacements.bgfield  = data['Background Field'];
  replacements.benefits = data['Benefit'];
  replacements.expP = data['Experience Reading Papers'];
  replacements.laptops = data['Laptop'];
  replacements.lda = data['Last Degree Acquired'];
  replacements.others = data['Other'];
  replacements.papertopic = data['Paper Topics Interested'];
  replacements.plan = data['Plans'];
  replacements.progLang = data['Programming Language of Choice'];
  replacements.timeded = data['Time Dedication'];
  replacements.bestat = data['What are you best at'];
  replacements.whybi = data['Why Bioinformatics'];
  replacements.position = positions[params];
  replacements.Name = data.Name;
  replacements.affiliationANS =  data.Affiliation;
  replacements.experienceANS = data['Experience with Users'];
  replacements.goalsANS =  data.Goals;
  replacements.motivationANS= data.Motivation;
  replacements.phoneANS = data.Phone;
  replacements.opportunityANS = data['How you found out about this opportunity'];
  replacements.profBGANS = data['Professional Background'];
  replacements.swedenANS = data['Supercomputers in Sweden and Germany'];
  replacements.willingnessANS = data['Willingness to Learn'];
  replacements.englishProfANS = data['English Proficiency'];
  replacements.expectationsANS =  data['Expectations'];
  replacements.timeANS = data['Time Availability'];
  replacements.topicANS = data['Topic in Life Science'];
  replacements.mindANS = data['Your Mind'];
  replacements.whyABIANS = data['Why ABI'];
  replacements.armProfANS = data['Armenian Proficiency'];
  replacements.previousEx = data['Previous Work Examples'];
  replacements.changes = data['Proposed Changes'];

  replacements.position = positions[params];
    replacements.Name = data.Name;
    replacements.affiliationANS =  data.Affiliation;
    replacements.experienceANS = data['Experience with Users'];
    replacements.goalsANS =  data.Goals;
    replacements.motivationANS= data.Motivation;
    replacements.phoneANS = data.Phone;
    replacements.opportunityANS = data['How you found out about this opportunity'];
    replacements.profBGANS = data['Professional Background'];
    replacements.swedenANS = data['Supercomputers in Sweden and Germany'];
    replacements.willingnessANS = data['Willingness to Learn'];
    replacements.englishProfANS = data['English Proficiency'];
    replacements.expectationsANS =  data['Expectations'];
    replacements.timeANS = data['Time Availability'];
    replacements.topicANS = data['Topic in Life Science'];
    replacements.mindANS = data['Your Mind'];
    replacements.timeCommitmentANS = data['Time Commitment'];
    replacements.whyABIANS = data['Why ABI'];
    replacements.armProfANS = data['Armenian Proficiency'];
    replacements.previousEx = data['Previous Work Examples'];
    replacements.changes = data['Proposed Changes'];
  for(let i = 0; i< replacements.length; i++){
    if(replacements[i]===undefined){
      replacements[i]='';
    }
  }

  const htmlToSend = template(replacements);
  return transporter.sendMail({
    from: 'info@abi.am',
    to: data.Email,
    subject: 'Application Successfully Submitted to ABI',
    html: htmlToSend,
    bcc: ['info@abi.am', 'lilit.nersisyan@abi.am'],
    attachments: [{
      filename:'ABI_logo_final-01.png',
      path: './email/images/ABI_logo_final-01.png',
      cid: 'unique@ABIlOgO'
    },
      {
        filename: 'facebook.png',
        path:'./email/images/facebook.png',
        cid: 'unique@ABIfb'
      },
      {
        filename: 'linkedin.png',
        path:'./email/images/linkedin.png',
        cid: 'unique@ABIlnkdn'
      },
    ]
  }).then(res=>{
    console.log('email sent successfully to ' + data.Email);
    console.log(keys.Affiliation);
  }).catch(err=>{
    console.log(err);
  });


});
