exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Зөвхөн POST method зөвшөөрөх
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // Validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // Email хүлээн авагчийн хаяг
    const recipientEmail = 'pvjee9631@gmail.com'; // Өөрийн email оруулах

    // Энд email илгээх логик байх ёстой
    // Түр хугацаанд console.log хийж байна
    console.log('Contact form submission:', {
      name,
      email, 
      message,
      recipientEmail
    });

    // Амжилттай илгээсэн хариу буцаах
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Message sent successfully! I will get back to you soon.',
        receivedData: { name, email, message }
      })
    };

  } catch (error) {
    console.error('Error in contact function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};