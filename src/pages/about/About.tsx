import React from 'react'

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import './About.scss'

interface AboutProps {}

const About: React.FC<AboutProps> = () => (
    <IonPage id='about-page'>
        <IonHeader>
            <IonToolbar color='primary'>
                <IonTitle className='text-center'>About</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <h3 className='ion-padding-top ion-padding-start'>Vision</h3>

            <p className='ion-padding'>
                To engage, encourage, motivate and promote responsible public, government,
                non-government, private and public sector to focus on various environmental and
                socio-economic developmental projects those are aligned with ALL 17 United Nations
                Sustainable Development Goals. MISSION: Create, Manage and Sustain unique volunteer
                groups in every State and Union Territory of India to implement the corporate social
                responsibility factors in conjunction with NITI Aayogs published data - a Policy
                Think Tank created by the Government of India.
            </p>

            <h3 className='ion-padding-top ion-padding-start'>Our History</h3>
            <p className='ion-padding'>
                i Care (U.A.E.) was originally established in Dubai, United Arab Emirates, in 2016
                as a result of a gap been identified in the then education system. The topic of
                ‘social responsibility’ was only discussed as a ‘theory’ in many schools and thus,
                students lacked their hands-on experience in the actual field of work. To bridge
                this specific gap, a ‘Parents Volunteer Group’ was born. In 2017, a similar
                organisation was established in India, called i Care (India) with its head office in
                Bengaluru, Karnataka. As it grew bigger and stronger, we had decided to register our
                Group under Indian Trusts Act, 1882 as a non-profit volunteer organisation called, i
                LOVE TO CARE (INDIA) CHARITABLE TRUST, Registration number: RJN-4-00058-2019-20.
            </p>
            <h3 className='ion-padding-top ion-padding-start'>Our Team</h3>
            <p className='ion-padding'>
                <li className='ion-padding'>
                    Anand G. Padmanabhan, CHAIRMAN OF THE BOARD, Brampton, ON, Canada{' '}
                </li>
                <li className='ion-padding'>
                    Nandini Jaganath, PRESIDENT, Bengaluru, Karnataka, India
                </li>
                <li className='ion-padding'>
                    Kalyani Krishnapuram, TRUSTEE, Bengaluru, Karnataka, India
                </li>
                <li className='ion-padding'>
                    Divya K. Narasimha Murthy, TRUSTEE, Bengaluru, Karnataka, India{' '}
                </li>
                <li className='ion-padding'>
                    Sujay Kumar B.S., TRUSTEE, Bengaluru, Karnataka, India{' '}
                </li>
                <br />
                Our current volunteer numbers are in excess of 800. The mix includes, professionals
                of various background, parents, students of all ages. We work closely with multiple
                universities to provide FREE of the following major Industry 4.0 programmes through
                e-learning and virtual classroom environment, for all walks of students, to prepare
                them for their future.
            </p>
            <h3 className='ion-padding-top ion-padding-start'>Contact</h3>
            <p className='ion-padding'>
                <a href='mailto:name@email.com'>ilove2careindia@gmail.com</a>
            </p>
        </IonContent>
    </IonPage>
)

export default About
