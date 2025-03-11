document.getElementById('resume-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const summary = document.getElementById('summary').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const skillsLevel = document.getElementById('skills-level').value;
    const certifications = document.getElementById('certifications').value;
    const projects = document.getElementById('projects').value;
    const languages = document.getElementById('languages').value;
    const references = document.getElementById('references').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const template = document.getElementById('template').value;

    const profilePicture = document.getElementById('profile-picture').files[0];

    const skillsArray = skills.split(',').map(skill => `<div>${skill.trim()}</div>`).join('');
    const skillsLevelArray = skillsLevel.split(',').map(level => `<div>${level.trim()}</div>`).join('');

    // Read image file as a base64 string
    let reader = new FileReader();

    // ✅ Fetch a random background from Unsplash
    fetch('https://source.unsplash.com/random/800x600/?background')
        .then(response => {
            const backgroundImage = response.url;

            reader.onload = function (e) {
                const imageData = e.target ? e.target.result : '';

                const resumeContent = `
                    <html>
                    <head>
                        <title>${name} - Resume</title>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                margin: 0;
                                padding: 20px;
                                background: url('${backgroundImage}') no-repeat center center;
                                background-size: cover;
                            }
                            .resume {
                                max-width: 800px;
                                margin: auto;
                                padding: 30px;
                                background-color: rgba(255, 255, 255, 0.9);
                                border-radius: 10px;
                                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                            }
                            h2 {
                                font-size: 36px;
                                color: #333;
                            }
                            .profile-picture {
                                width: 100px;
                                height: 100px;
                                border-radius: 50%;
                                object-fit: cover;
                                display: block;
                                margin-bottom: 20px;
                            }
                            .section-title {
                                font-size: 20px;
                                color: #333;
                                border-bottom: 2px solid #007bff;
                                margin-bottom: 15px;
                                padding-bottom: 5px;
                            }
                            .skills-list {
                                display: flex;
                                flex-wrap: wrap;
                                gap: 10px;
                            }
                            .skills-list div {
                                background-color: #007bff;
                                color: white;
                                padding: 8px 16px;
                                border-radius: 20px;
                                font-size: 14px;
                            }
                            .contact-info {
                                display: flex;
                                justify-content: space-between;
                                font-size: 16px;
                                margin-bottom: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="resume">
                            ${imageData ? `<img src="${imageData}" alt="Profile Picture" class="profile-picture">` : ''}
                            <h2>${name}</h2>
                            <div class="contact-info">
                                <div><strong>Email:</strong> ${email}</div>
                                <div><strong>Phone:</strong> ${phone}</div>
                            </div>
                            <p><strong>Address:</strong> ${address}</p>
                            <div class="section">
                                <div class="section-title">Profile Summary</div>
                                <p>${summary}</p>
                            </div>
                            <div class="section">
                                <div class="section-title">Education</div>
                                <p>${education}</p>
                            </div>
                            <div class="section">
                                <div class="section-title">Experience</div>
                                <p>${experience}</p>
                            </div>
                            <div class="section">
                                <div class="section-title">Skills</div>
                                <div class="skills-list">${skillsArray}</div>
                            </div>
                            <div class="section">
                                <div class="section-title">Skills Proficiency</div>
                                <div class="skills-list">${skillsLevelArray}</div>
                            </div>
                            <div class="section">
                                <div class="section-title">Certifications/Awards</div>
                                <p>${certifications}</p>
                            </div>
                            <div class="section">
                                <div class="section-title">Projects</div>
                                <p>${projects}</p>
                            </div>
                            <div class="section">
                                <div class="section-title">Languages</div>
                                <p>${languages}</p>
                            </div>
                            <div class="section">
                                <div class="section-title">References</div>
                                <p>${references}</p>
                            </div>
                            <div class="section">
                                <div class="section-title">Social Media Links</div>
                                <p>LinkedIn: <a href="${linkedin}" target="_blank">${linkedin}</a></p>
                                <p>GitHub: <a href="${github}" target="_blank">${github}</a></p>
                            </div>
                        </div>
                    </body>
                    </html>
                `;

                const resumeWindow = window.open('', '_blank');
                resumeWindow.document.open();
                resumeWindow.document.write(resumeContent);
                resumeWindow.document.close();
            };

            if (profilePicture) {
                reader.readAsDataURL(profilePicture);
            } else {
                reader.onload(); // Call even if no image is uploaded
            }
        })
        .catch(error => {
            console.error('Error fetching background image:', error);
            alert('Failed to load background image.');
        });
});
