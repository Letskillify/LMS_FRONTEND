import { Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { EditApi } from '../../Custom Hooks/CustomeHook';
import { MainContext } from '../../Controller/MainProvider';



const validationSchema = Yup.object({
    parentDetails: Yup.object({
        Father: Yup.object({
            name: Yup.string().nullable(),
            qualification: Yup.string().nullable(),
            residentialAddress: Yup.string().nullable(),
            occupation: Yup.string().nullable(),
            officialAddress: Yup.string().nullable(),
            annualIncome: Yup.string().nullable(),
            contactNumber: Yup.string()
                .nullable()
                .matches(/^\d{10}$/, "Contact number must be 10 digits"),
            email: Yup.string()
                .nullable()
                .email("Invalid email address"),
        }),
        Mother: Yup.object({
            name: Yup.string().nullable(),
            qualification: Yup.string().nullable(),
            residentialAddress: Yup.string().nullable(),
            occupation: Yup.string().nullable(),
            officialAddress: Yup.string().nullable(),
            annualIncome: Yup.string().nullable(),
            contactNumber: Yup.string()
                .nullable()
                .matches(/^\d{10}$/, "Contact number must be 10 digits"),
            email: Yup.string()
                .nullable()
                .email("Invalid email address"),
        }),
        Guardian: Yup.object({
            name: Yup.string().nullable(),
            qualification: Yup.string().nullable(),
            residentialAddress: Yup.string().nullable(),
            occupation: Yup.string().nullable(),
            officialAddress: Yup.string().nullable(),
            annualIncome: Yup.string().nullable(),
            contactNumber: Yup.string()
                .nullable()
                .matches(/^\d{10}$/, "Contact number must be 10 digits"),
            email: Yup.string()
                .nullable()
                .email("Invalid email address"),
            relation: Yup.string().nullable(),
        }),
    }),
});


const EditParents = () => {
    const [editDocument, setEditDocument] = useState()
    const Navigate = useNavigate();
    const location = useLocation();
    const { studentId, Parents } = location.state || {};

    if (!Parents || !studentId) {
        return <div className="text-center">No student data available</div>;
    }


    const initialValues = {
        parentDetails: {
            Father: {
                name: Parents?.parentDetails?.Father?.name,
                qualification: Parents?.parentDetails?.Father?.qualification,
                residentialAddress: Parents?.parentDetails?.Father?.residentialAddress,
                occupation: Parents?.parentDetails?.Father?.occupation,
                officialAddress: Parents?.parentDetails?.Father?.officialAddress,
                annualIncome: Parents?.parentDetails?.Father?.annualIncome,
                contactNumber: Parents?.parentDetails?.Father?.contactNumber,
                email: Parents?.parentDetails?.Father?.email,
            },
            Mother: {
                name: Parents?.parentDetails?.Mother?.name,
                qualification: Parents?.parentDetails?.Mother?.qualification,
                residentialAddress: Parents?.parentDetails?.Mother?.residentialAddress,
                occupation: Parents?.parentDetails?.Mother?.occupation,
                officialAddress: Parents?.parentDetails?.Mother?.officialAddress,
                annualIncome: Parents?.parentDetails?.Mother?.annualIncome,
                contactNumber: Parents?.parentDetails?.Mother?.contactNumber,
                email: Parents?.parentDetails?.Mother?.email,
            },
            Guardian: {
                name: Parents?.parentDetails?.Guardian?.name,
                qualification: Parents?.parentDetails?.Guardian?.qualification,
                residentialAddress: Parents?.parentDetails?.Guardian?.residentialAddress,
                occupation: Parents?.parentDetails?.Guardian?.occupation,
                officialAddress: Parents?.parentDetails?.Guardian?.officialAddress,
                annualIncome: Parents?.parentDetails?.Guardian?.annualIncome,
                contactNumber: Parents?.parentDetails?.Guardian?.contactNumber,
                email: Parents?.parentDetails?.Guardian?.email,
                relation: Parents?.parentDetails?.Guardian?.relation,
            },
        },
    };
    // form Submite
    const handleEditdata = async (values) => {
        await EditApi("/api/student/update/" + studentId, values, "Student updated successfully");
        Navigate("/manage-accounts");
        fetchStudentData();
        window.scrollTo({ top: 200, behavior: 'smooth' })
    }


    return (
        <>
            <div className="modal-body">
                <div className="nav-align-top mb-4">

                    <Formik initialValues={initialValues} onSubmit={handleEditdata} validationSchema={validationSchema} >
                        {({ values, handleChange, handleBlur, errors, touched }) => (
                            <Form className="border p-4 shadow rounded bg-white container">

                                <div>
                                    <h4 className="mb-4">Parents Detail</h4>
                                    <div>
                                        <table className="table table-bordered table-33 no-white-space">
                                            <thead>
                                                <tr>
                                                    <th style={{ maxWidth: "100px", width: "100px" }}>Details</th>
                                                    <th style={{ maxWidth: "150px", width: "150px" }}>Mother</th>
                                                    <th style={{ maxWidth: "150px", width: "150px" }}>Father</th>
                                                    <th style={{ maxWidth: "150px", width: "150px" }}>Guardian</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Mother.name" />
                                                            {errors?.parentDetails?.Mother?.name && <div className="text-danger">{errors?.parentDetails?.Mother?.name}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Father.name" />
                                                            {errors?.parentDetails?.Father?.name && <div className="text-danger">{errors?.parentDetails?.Father?.name}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Guardian.name" />
                                                            {errors?.parentDetails?.Guardian?.name && <div className="text-danger">{errors.parentDetails?.Guardian?.name}</div>}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Qualification</th>
                                                    <td>
                                                        <div className="d-grid">
                                                            <select className="form-select select2 select2-hidden-accessible" data-placeholder="" name="parentDetails.Mother.qualification" data-select2-id="select2-data-63-a6ku" tabIndex="-1" aria-hidden="true" value={values.parentDetails.Mother.qualification}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}>
                                                                <option value={values?.parentDetails?.Mother?.qualification}>{values?.parentDetails?.Mother?.qualification}</option>
                                                                <option data-select2-id="select2-data-65-5837">Select</option>
                                                                <option value="10th - high school">10th - High School</option>
                                                                <option value="12th - intermediate">12th - Intermediate</option>
                                                                <option value="advanced program (advanced program)">Advanced Program (Advanced Program)</option>
                                                                <option value="animation, graphics and multimedia">Animation, Graphics and Multimedia</option>
                                                                <option value="aviation courses">Aviation Courses</option>
                                                                <option value="b.arch- bachelor of architecture">B.Arch- Bachelor of Architecture</option>
                                                                <option value="b.com (hons.)">B.Com (Hons.)</option>
                                                                <option value="b.com ll.b. - integrated law program">B.Com LL.B. - Integrated Law Program</option>
                                                                <option value="b.com- bachelor of commerce">B.Com- Bachelor of Commerce</option>
                                                                <option value="b.ed - bachelor of education">B.Ed - Bachelor of Education</option>
                                                                <option value="b.pharma- bachelor of pharmacy">B.Pharma- Bachelor of Pharmacy</option>
                                                                <option value="b.sc- applied geology">B.Sc- Applied Geology</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- nursing">B.Sc- Nursing</option>
                                                                <option value="b.sc. – nutrition &amp; dietetics">B.Sc. – Nutrition &amp; Dietetics</option>
                                                                <option value="b.sc. chemistry">B.Sc. Chemistry</option>
                                                                <option value="b.sc. mathematics">B.Sc. Mathematics</option>
                                                                <option value="b.sc.- hospitality and hotel administration">B.Sc.- Hospitality and Hotel Administration</option>
                                                                <option value="b.sc.- information technology">B.Sc.- Information Technology</option>
                                                                <option value="b.sc.- physics">B.Sc.- Physics</option>
                                                                <option value="b.tech - bachelor of technology">B.Tech - Bachelor of Technology</option>
                                                                <option value="ba - bachelor of arts">BA - Bachelor of Arts</option>
                                                                <option value="ba (hons.) in economics">BA (Hons.) in Economics</option>
                                                                <option value="ba + ll.b - integrated law course">BA + LL.B - Integrated Law Course</option>
                                                                <option value="ba/b.sc. liberal arts">BA/B.Sc. Liberal Arts</option>
                                                                <option value="bachelor in aeronautical engineering">Bachelor in Aeronautical Engineering</option>
                                                                <option value="bachelor in automation and robotics">Bachelor in Automation and Robotics</option>
                                                                <option value="bachelor in automobile engineering">Bachelor in Automobile Engineering</option>
                                                                <option value="bachelor in biotechnology engineering">Bachelor in Biotechnology Engineering</option>
                                                                <option value="bachelor in ceramic engineering">Bachelor in Ceramic Engineering</option>
                                                                <option value="bachelor in chemical engineering">Bachelor in Chemical Engineering</option>
                                                                <option value="bachelor in civil engineering">Bachelor in Civil Engineering</option>
                                                                <option value="bachelor in computer science and engineering">Bachelor in Computer Science and Engineering</option>
                                                                <option value="bachelor in construction engineering">Bachelor in Construction Engineering</option>
                                                                <option value="bachelor in electrical and electronics engineering">Bachelor in Electrical and Electronics Engineering</option>
                                                                <option value="bachelor in electronics and communication engineering">Bachelor in Electronics and Communication Engineering</option>
                                                                <option value="bachelor in foreign language">Bachelor in Foreign Language</option>
                                                                <option value="bachelor in instrumentation engineering">Bachelor in Instrumentation Engineering</option>
                                                                <option value="bachelor in petroleum engineering">Bachelor in Petroleum Engineering</option>
                                                                <option value="bachelor in power engineering">Bachelor in Power Engineering</option>
                                                                <option value="bachelor in robotics engineering">Bachelor in Robotics Engineering</option>
                                                                <option value="bachelor in smart manufacturing &amp; automation">Bachelor in Smart Manufacturing &amp; Automation</option>
                                                                <option value="bachelor in structural engineering">Bachelor in Structural Engineering</option>
                                                                <option value="bachelor in textile engineering">Bachelor in Textile Engineering</option>
                                                                <option value="bachelor in transportation engineering">Bachelor in Transportation Engineering</option>
                                                                <option value="bachelor of design (b. design)">Bachelor of Design (B. Design)</option>
                                                                <option value="bachelor of design in accessory design">Bachelor of Design in Accessory Design</option>
                                                                <option value="bachelor of design in ceramic design">Bachelor of Design in Ceramic Design</option>
                                                                <option value="bachelor of design in fashion design">Bachelor of Design in fashion Design</option>
                                                                <option value="bachelor of design in graphic design">Bachelor of Design in Graphic Design</option>
                                                                <option value="bachelor of design in industrial design">Bachelor of Design in Industrial Design</option>
                                                                <option value="bachelor of design in jewellery design">Bachelor of Design in Jewellery Design</option>
                                                                <option value="bachelor of design in leather design">Bachelor of Design in Leather Design</option>
                                                                <option value="bachelor of performing arts">Bachelor of Performing Arts</option>
                                                                <option value="bachelor of physical education (b.p.ed)">Bachelor Of Physical Education (B.P.Ed)</option>
                                                                <option value="bba - bachelor of business administration">BBA - Bachelor of Business Administration</option>
                                                                <option value="bba ll.b - integarted law program">BBA LL.B - Integarted Law Program</option>
                                                                <option value="bbs- bachelor of business studies">BBS- Bachelor of Business Studies</option>
                                                                <option value="bca">BCA</option>
                                                                <option value="bca- bachelor of computer applications">BCA- Bachelor of Computer Applications</option>
                                                                <option value="bds- bachelor of dental surgery">BDS- Bachelor of Dental Surgery</option>
                                                                <option value="be or beng - bachelor of engineering">BE or BEng - Bachelor of Engineering</option>
                                                                <option value="bem- bachelor of event management">BEM- Bachelor of Event Management</option>
                                                                <option value="bfa- bachelor of fine arts">BFA- Bachelor of Fine Arts</option>
                                                                <option value="bfd- bachelor of fashion designing">BFD- Bachelor of Fashion Designing</option>
                                                                <option value="bjmc- bachelor of journalism and mass communication">BJMC- Bachelor of Journalism and Mass Communication</option>
                                                                <option value="bms- bachelor of management science">BMS- Bachelor of Management Science</option>
                                                                <option value="bpt- bachelor of physiotherapy">BPT- Bachelor of Physiotherapy</option>
                                                                <option value="bsw- bachelor of social work">BSW- Bachelor of Social Work</option>
                                                                <option value="bte - bachelor of technical education">BTE - Bachelor of Technical Education</option>
                                                                <option value="bttm- bachelor of travel and tourism management">BTTM- Bachelor of Travel and Tourism Management</option>
                                                                <option value="ca- chartered accountancy">CA- Chartered Accountancy</option>
                                                                <option value="cs- company secretary">CS- Company Secretary</option>
                                                                <option value="ctet - central teacher eligibility test">CTET - Central Teacher Eligibility Test</option>
                                                                <option value="d.ed (diploma in education)">D.Ed (Diploma in Education)</option>
                                                                <option value="d.pharma - diploma in pharmacy">D.Pharma - Diploma in Pharmacy</option>
                                                                <option value="e.f.p.m - executive fellow program in management">E.F.P.M - Executive Fellow Program In Management</option>
                                                                <option value="e.m.p - executive management programme">E.M.P - Executive Management Programme</option>
                                                                <option value="ecced">ECCed</option>
                                                                <option value="executive post graduate certificate (executive pg certificate)">Executive Post Graduate Certificate (Executive PG Certificate)</option>
                                                                <option value="executive post graduate programme (executive pg programme)">Executive Post Graduate Programme (Executive PG Programme)</option>
                                                                <option value="fellow programme (fellow programme)">Fellow Programme (Fellow Programme)</option>
                                                                <option value="graduation">GRADUATION</option>
                                                                <option value="htet - haryana teacher eligibility test">HTET - Haryana Teacher Eligibility Test</option>
                                                                <option value="international programme (international programme)">International Programme (International Programme)</option>
                                                                <option value="ix">IX</option>
                                                                <option value="jbt - junior basic training">JBT - Junior Basic Training</option>
                                                                <option value="junior high school">Junior High School</option>
                                                                <option value="ll.m - master of law">LL.M - Master of Law</option>
                                                                <option value="llb - bachelor of legislative law">LLB - Bachelor of Legislative Law</option>
                                                                <option value="m.com - master of commerce">M.Com - Master of Commerce</option>
                                                                <option value="m.d - doctor of medicine">M.D - Doctor of Medicine</option>
                                                                <option value="m.d.s - master of dental surgery">M.D.S - Master of Dental Surgery</option>
                                                                <option value="m.e - master of engineering">M.E - Master of Engineering</option>
                                                                <option value="m.ed - master of education">M.Ed - Master of Education</option>
                                                                <option value="m.ed - masters in education">M.Ed - Masters in Education</option>
                                                                <option value="m.ed ai -  artificial intelligence">M.Ed AI -  Artificial Intelligence</option>
                                                                <option value="m.f.a - master of fine arts">M.F.A - Master of Fine Arts</option>
                                                                <option value="m.f.c - master of finance and control">M.F.C - Master of Finance And Control</option>
                                                                <option value="m.pharma - master of pharmacy">M.Pharma - Master of Pharmacy</option>
                                                                <option value="m.phil - master of philosophy">M.Phil - Master of Philosophy</option>
                                                                <option value="m.s - master of science">M.S - Master of Science</option>
                                                                <option value="m.sc - master of science">M.Sc - Master of Science</option>
                                                                <option value="m.tech - master of technology">M.Tech - Master of Technology</option>
                                                                <option value="m.voc - master of vocational">M.Voc - Master of Vocational</option>
                                                                <option value="ma - master of arts">MA - Master of Arts</option>
                                                                <option value="management development programme (m.d.p)">Management Development Programme (M.D.P)</option>
                                                                <option value="master of architecture (m.arch)">Master of Architecture (M.Arch)</option>
                                                                <option value="master of arts in management (m.a.m)">Master of Arts in Management (M.A.M)</option>
                                                                <option value="master of arts in personal management (m.a.p.m)">Master of Arts in Personal Management (M.A.P.M)</option>
                                                                <option value="master of business economics (m.b.e)">Master of Business Economics (M.B.E)</option>
                                                                <option value="master of business laws (m.b.l)">Master of Business Laws (M.B.L)</option>
                                                                <option value="master of business management (m.b.m)">Master of Business Management (M.B.M)</option>
                                                                <option value="master of business studies (m.b.s)">Master of Business Studies (M.B.S)</option>
                                                                <option value="master of chirurgical (m.ch)">Master of Chirurgical (M.Ch)</option>
                                                                <option value="master of communication and journalism (m.c.j)">Master Of Communication And Journalism (M.C.J)</option>
                                                                <option value="master of comparative laws (m.c.l)">Master of Comparative Laws (M.C.L)</option>
                                                                <option value="master of computer management (m.c.m)">Master of Computer Management (M.C.M)</option>
                                                                <option value="master of corporate secretaryship (m.c.s)">Master of Corporate Secretaryship (M.C.S)</option>
                                                                <option value="master of film management (m.f.m)">Master of Film Management (M.F.M)</option>
                                                                <option value="master of financial services (m.f.s)">Master of Financial Services (M.F.S)</option>
                                                                <option value="master of fishery sciences (m.f.sc)">Master of Fishery Sciences (M.F.Sc)</option>
                                                                <option value="master of foreign trade (m.f.t)">Master of Foreign Trade (M.F.T)</option>
                                                                <option value="master of health science (m.h.sc)">Master Of Health Science (M.H.Sc)</option>
                                                                <option value="master of hospital administration (m.h.a)">Master of Hospital Administration (M.H.A)</option>
                                                                <option value="master of hospitality and hotel management (m.h.h.m)">Master of Hospitality And Hotel Management (M.H.H.M)</option>
                                                                <option value="master of hospitality management (m.h.m)">Master of Hospitality Management (M.H.M)</option>
                                                                <option value="master of human resource management (m.h.r.m)">Master of Human Resource Management (M.H.R.M)</option>
                                                                <option value="master of industrial relation and personal management (mir and pm)">Master of Industrial Relation and Personal Management (MIR and PM)</option>
                                                                <option value="master of international business (m.i.b)">Master of International Business (M.I.B)</option>
                                                                <option value="master of journalism (m.j)">Master of Journalism (M.J)</option>
                                                                <option value="master of labour management (m.l.m)">Master of Labour Management (M.L.M)</option>
                                                                <option value="master of laws (m.l)">Master of Laws (M.L)</option>
                                                                <option value="master of library and information science (m.l.i.sc)">Master of Library and Information Science (M.L.I.Sc)</option>
                                                                <option value="master of library science (m.l.sc)">Master of Library Science (M.L.Sc)</option>
                                                                <option value="master of management program (m.m.p)">Master of Management Program (M.M.P)</option>
                                                                <option value="master of management studies (m.m.s)">Master of Management Studies (M.M.S)</option>
                                                                <option value="master of marketing management (m.m.m)">Master of Marketing Management (M.M.M)</option>
                                                                <option value="master of occupational theraphy (m.o.t)">Master of Occupational Theraphy (M.O.T)</option>
                                                                <option value="master of performance management (m.p.m)">Master of Performance Management (M.P.M)</option>
                                                                <option value="master of performing arts (m.p.a)">Master of Performing Arts (M.P.A)</option>
                                                                <option value="master of personal management and industrial relation (mpm and ir)">Master of Personal Management and Industrial Relation (MPM and IR)</option>
                                                                <option value="master of personnel management (mpm)">Master of Personnel Management (MPM)</option>
                                                                <option value="master of physical education (m.p.ed)">Master Of Physical Education (M.P.Ed)</option>
                                                                <option value="master of physiotheraphy (m.p.t)">Master of Physiotheraphy (M.P.T)</option>
                                                                <option value="master of psychiatric epidemiology (m.p.e)">Master of Psychiatric Epidemiology (M.P.E)</option>
                                                                <option value="master of public health (m.p.h)">Master of Public Health (M.P.H)</option>
                                                                <option value="master of social dynamics (m.s.d)">Master of Social Dynamics (M.S.D)</option>
                                                                <option value="master of social work (m.s.w)">Master of Social Work (M.S.W)</option>
                                                                <option value="master of theology (m.th)">Master of Theology (M.Th)</option>
                                                                <option value="master of tourism administrations (m.t.a)">Master of Tourism Administrations (M.T.A)</option>
                                                                <option value="master of tourism management (m.t.m)">Master of Tourism Management (M.T.M)</option>
                                                                <option value="master of veterinary science (m.v.sc)">Master of Veterinary Science (M.V.Sc)</option>
                                                                <option value="master of visual arts (m.v.a)">Master of Visual Arts (M.V.A)</option>
                                                                <option value="masters in design (m.des)">Masters in Design (M.Des)</option>
                                                                <option value="masters in international management (m.i.m)">Masters in International Management (M.I.M)</option>
                                                                <option value="masters in public systems management (m.p.s.m)">Masters in Public Systems Management (M.P.S.M)</option>
                                                                <option value="masters of hospitality and tourism management (m.h.t.m)">Masters of Hospitality and Tourism Management (M.H.T.M)</option>
                                                                <option value="masters programme in international business (m.p.i.b)">Masters Programme in International Business (M.P.I.B)</option>
                                                                <option value="mba - master of business administration">MBA - Master of Business Administration</option>
                                                                <option value="mca">MCA</option>
                                                                <option value="mca - master of computer applications">MCA - Master of Computer Applications</option>
                                                                <option value="montessory">Montessory</option>
                                                                <option value="mscit">MSCIT</option>
                                                                <option value="net - national eligibility test">NET - National Eligibility Test</option>
                                                                <option value="no education">No Education</option>
                                                                <option value="ntt - nursery teacher training">NTT - Nursery Teacher Training</option>
                                                                <option value="pgdm - post graduate diploma in management">PGDM - Post Graduate Diploma in Management</option>
                                                                <option value="ph.d - doctor of philosophy">Ph.D - Doctor of Philosophy</option>
                                                                <option value="post graduation">Post Graduation</option>
                                                                <option value="primary">Primary</option>
                                                                <option value="stc mp">STC MP</option>
                                                            </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-64-gr3o" style={{ width: "224px" }}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-mother_qualification-hm-container" aria-controls="select2-mother_qualification-hm-container"><span className="select2-selection__rendered" id="select2-mother_qualification-hm-container" role="textbox" aria-readonly="true" title=""><span className="select2-selection__placeholder"></span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <select className="form-select select2 select2-hidden-accessible" data-placeholder="" name="parentDetails.Father.qualification" data-select2-id="select2-data-66-t6b6" tabIndex="-1" aria-hidden="true" value={values.parentDetails.Father.qualification}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}>
                                                                <option value={values.parentDetails.Father.qualification} data-select2-id="select2-data-68-tue4">{values.parentDetails.Father.qualification}</option><option value="1st - primary">1st - Primary</option>
                                                                <option value="10th - high school">10th - High School</option>
                                                                <option value="12th - intermediate">12th - Intermediate</option>
                                                                <option value="advanced program (advanced program)">Advanced Program (Advanced Program)</option>
                                                                <option value="animation, graphics and multimedia">Animation, Graphics and Multimedia</option>
                                                                <option value="aviation courses">Aviation Courses</option>
                                                                <option value="b.arch- bachelor of architecture">B.Arch- Bachelor of Architecture</option>
                                                                <option value="b.com (hons.)">B.Com (Hons.)</option>
                                                                <option value="b.com ll.b. - integrated law program">B.Com LL.B. - Integrated Law Program</option>
                                                                <option value="b.com- bachelor of commerce">B.Com- Bachelor of Commerce</option>
                                                                <option value="b.ed - bachelor of education">B.Ed - Bachelor of Education</option>
                                                                <option value="b.pharma- bachelor of pharmacy">B.Pharma- Bachelor of Pharmacy</option>
                                                                <option value="b.sc- applied geology">B.Sc- Applied Geology</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- nursing">B.Sc- Nursing</option>
                                                                <option value="b.sc. – nutrition &amp; dietetics">B.Sc. – Nutrition &amp; Dietetics</option>
                                                                <option value="b.sc. chemistry">B.Sc. Chemistry</option>
                                                                <option value="b.sc. mathematics">B.Sc. Mathematics</option>
                                                                <option value="b.sc.- hospitality and hotel administration">B.Sc.- Hospitality and Hotel Administration</option>
                                                                <option value="b.sc.- information technology">B.Sc.- Information Technology</option>
                                                                <option value="b.sc.- physics">B.Sc.- Physics</option>
                                                                <option value="b.tech - bachelor of technology">B.Tech - Bachelor of Technology</option>
                                                                <option value="ba - bachelor of arts">BA - Bachelor of Arts</option>
                                                                <option value="ba (hons.) in economics">BA (Hons.) in Economics</option>
                                                                <option value="ba + ll.b - integrated law course">BA + LL.B - Integrated Law Course</option>
                                                                <option value="ba/b.sc. liberal arts">BA/B.Sc. Liberal Arts</option>
                                                                <option value="bachelor in aeronautical engineering">Bachelor in Aeronautical Engineering</option>
                                                                <option value="bachelor in automation and robotics">Bachelor in Automation and Robotics</option>
                                                                <option value="bachelor in automobile engineering">Bachelor in Automobile Engineering</option>
                                                                <option value="bachelor in biotechnology engineering">Bachelor in Biotechnology Engineering</option>
                                                                <option value="bachelor in ceramic engineering">Bachelor in Ceramic Engineering</option>
                                                                <option value="bachelor in chemical engineering">Bachelor in Chemical Engineering</option>
                                                                <option value="bachelor in civil engineering">Bachelor in Civil Engineering</option>
                                                                <option value="bachelor in computer science and engineering">Bachelor in Computer Science and Engineering</option>
                                                                <option value="bachelor in construction engineering">Bachelor in Construction Engineering</option>
                                                                <option value="bachelor in electrical and electronics engineering">Bachelor in Electrical and Electronics Engineering</option>
                                                                <option value="bachelor in electronics and communication engineering">Bachelor in Electronics and Communication Engineering</option>
                                                                <option value="bachelor in foreign language">Bachelor in Foreign Language</option>
                                                                <option value="bachelor in instrumentation engineering">Bachelor in Instrumentation Engineering</option>
                                                                <option value="bachelor in petroleum engineering">Bachelor in Petroleum Engineering</option>
                                                                <option value="bachelor in power engineering">Bachelor in Power Engineering</option>
                                                                <option value="bachelor in robotics engineering">Bachelor in Robotics Engineering</option>
                                                                <option value="bachelor in smart manufacturing &amp; automation">Bachelor in Smart Manufacturing &amp; Automation</option>
                                                                <option value="bachelor in structural engineering">Bachelor in Structural Engineering</option>
                                                                <option value="bachelor in textile engineering">Bachelor in Textile Engineering</option>
                                                                <option value="bachelor in transportation engineering">Bachelor in Transportation Engineering</option>
                                                                <option value="bachelor of design (b. design)">Bachelor of Design (B. Design)</option>
                                                                <option value="bachelor of design in accessory design">Bachelor of Design in Accessory Design</option>
                                                                <option value="bachelor of design in ceramic design">Bachelor of Design in Ceramic Design</option>
                                                                <option value="bachelor of design in fashion design">Bachelor of Design in fashion Design</option>
                                                                <option value="bachelor of design in graphic design">Bachelor of Design in Graphic Design</option>
                                                                <option value="bachelor of design in industrial design">Bachelor of Design in Industrial Design</option>
                                                                <option value="bachelor of design in jewellery design">Bachelor of Design in Jewellery Design</option>
                                                                <option value="bachelor of design in leather design">Bachelor of Design in Leather Design</option>
                                                                <option value="bachelor of performing arts">Bachelor of Performing Arts</option>
                                                                <option value="bachelor of physical education (b.p.ed)">Bachelor Of Physical Education (B.P.Ed)</option>
                                                                <option value="bba - bachelor of business administration">BBA - Bachelor of Business Administration</option>
                                                                <option value="bba ll.b - integarted law program">BBA LL.B - Integarted Law Program</option>
                                                                <option value="bbs- bachelor of business studies">BBS- Bachelor of Business Studies</option>
                                                                <option value="bca">BCA</option>
                                                                <option value="bca- bachelor of computer applications">BCA- Bachelor of Computer Applications</option>
                                                                <option value="bds- bachelor of dental surgery">BDS- Bachelor of Dental Surgery</option>
                                                                <option value="be or beng - bachelor of engineering">BE or BEng - Bachelor of Engineering</option>
                                                                <option value="bem- bachelor of event management">BEM- Bachelor of Event Management</option>
                                                                <option value="bfa- bachelor of fine arts">BFA- Bachelor of Fine Arts</option>
                                                                <option value="bfd- bachelor of fashion designing">BFD- Bachelor of Fashion Designing</option>
                                                                <option value="bjmc- bachelor of journalism and mass communication">BJMC- Bachelor of Journalism and Mass Communication</option>
                                                                <option value="bms- bachelor of management science">BMS- Bachelor of Management Science</option>
                                                                <option value="bpt- bachelor of physiotherapy">BPT- Bachelor of Physiotherapy</option>
                                                                <option value="bsw- bachelor of social work">BSW- Bachelor of Social Work</option>
                                                                <option value="bte - bachelor of technical education">BTE - Bachelor of Technical Education</option>
                                                                <option value="bttm- bachelor of travel and tourism management">BTTM- Bachelor of Travel and Tourism Management</option>
                                                                <option value="ca- chartered accountancy">CA- Chartered Accountancy</option>
                                                                <option value="cs- company secretary">CS- Company Secretary</option>
                                                                <option value="ctet - central teacher eligibility test">CTET - Central Teacher Eligibility Test</option>
                                                                <option value="d.ed (diploma in education)">D.Ed (Diploma in Education)</option>
                                                                <option value="d.pharma - diploma in pharmacy">D.Pharma - Diploma in Pharmacy</option>
                                                                <option value="e.f.p.m - executive fellow program in management">E.F.P.M - Executive Fellow Program In Management</option>
                                                                <option value="e.m.p - executive management programme">E.M.P - Executive Management Programme</option>
                                                                <option value="ecced">ECCed</option>
                                                                <option value="executive post graduate certificate (executive pg certificate)">Executive Post Graduate Certificate (Executive PG Certificate)</option>
                                                                <option value="executive post graduate programme (executive pg programme)">Executive Post Graduate Programme (Executive PG Programme)</option>
                                                                <option value="fellow programme (fellow programme)">Fellow Programme (Fellow Programme)</option>
                                                                <option value="graduation">GRADUATION</option>
                                                                <option value="htet - haryana teacher eligibility test">HTET - Haryana Teacher Eligibility Test</option>
                                                                <option value="international programme (international programme)">International Programme (International Programme)</option>
                                                                <option value="ix">IX</option>
                                                                <option value="jbt - junior basic training">JBT - Junior Basic Training</option>
                                                                <option value="junior high school">Junior High School</option>
                                                                <option value="ll.m - master of law">LL.M - Master of Law</option>
                                                                <option value="llb - bachelor of legislative law">LLB - Bachelor of Legislative Law</option>
                                                                <option value="m.com - master of commerce">M.Com - Master of Commerce</option>
                                                                <option value="m.d - doctor of medicine">M.D - Doctor of Medicine</option>
                                                                <option value="m.d.s - master of dental surgery">M.D.S - Master of Dental Surgery</option>
                                                                <option value="m.e - master of engineering">M.E - Master of Engineering</option>
                                                                <option value="m.ed - master of education">M.Ed - Master of Education</option>
                                                                <option value="m.ed - masters in education">M.Ed - Masters in Education</option>
                                                                <option value="m.ed ai -  artificial intelligence">M.Ed AI -  Artificial Intelligence</option>
                                                                <option value="m.f.a - master of fine arts">M.F.A - Master of Fine Arts</option>
                                                                <option value="m.f.c - master of finance and control">M.F.C - Master of Finance And Control</option>
                                                                <option value="m.pharma - master of pharmacy">M.Pharma - Master of Pharmacy</option>
                                                                <option value="m.phil - master of philosophy">M.Phil - Master of Philosophy</option>
                                                                <option value="m.s - master of science">M.S - Master of Science</option>
                                                                <option value="m.sc - master of science">M.Sc - Master of Science</option>
                                                                <option value="m.tech - master of technology">M.Tech - Master of Technology</option>
                                                                <option value="m.voc - master of vocational">M.Voc - Master of Vocational</option>
                                                                <option value="ma - master of arts">MA - Master of Arts</option>
                                                                <option value="management development programme (m.d.p)">Management Development Programme (M.D.P)</option>
                                                                <option value="master of architecture (m.arch)">Master of Architecture (M.Arch)</option>
                                                                <option value="master of arts in management (m.a.m)">Master of Arts in Management (M.A.M)</option>
                                                                <option value="master of arts in personal management (m.a.p.m)">Master of Arts in Personal Management (M.A.P.M)</option>
                                                                <option value="master of business economics (m.b.e)">Master of Business Economics (M.B.E)</option>
                                                                <option value="master of business laws (m.b.l)">Master of Business Laws (M.B.L)</option>
                                                                <option value="master of business management (m.b.m)">Master of Business Management (M.B.M)</option>
                                                                <option value="master of business studies (m.b.s)">Master of Business Studies (M.B.S)</option>
                                                                <option value="master of chirurgical (m.ch)">Master of Chirurgical (M.Ch)</option>
                                                                <option value="master of communication and journalism (m.c.j)">Master Of Communication And Journalism (M.C.J)</option>
                                                                <option value="master of comparative laws (m.c.l)">Master of Comparative Laws (M.C.L)</option>
                                                                <option value="master of computer management (m.c.m)">Master of Computer Management (M.C.M)</option>
                                                                <option value="master of corporate secretaryship (m.c.s)">Master of Corporate Secretaryship (M.C.S)</option>
                                                                <option value="master of film management (m.f.m)">Master of Film Management (M.F.M)</option>
                                                                <option value="master of financial services (m.f.s)">Master of Financial Services (M.F.S)</option>
                                                                <option value="master of fishery sciences (m.f.sc)">Master of Fishery Sciences (M.F.Sc)</option>
                                                                <option value="master of foreign trade (m.f.t)">Master of Foreign Trade (M.F.T)</option>
                                                                <option value="master of health science (m.h.sc)">Master Of Health Science (M.H.Sc)</option>
                                                                <option value="master of hospital administration (m.h.a)">Master of Hospital Administration (M.H.A)</option>
                                                                <option value="master of hospitality and hotel management (m.h.h.m)">Master of Hospitality And Hotel Management (M.H.H.M)</option>
                                                                <option value="master of hospitality management (m.h.m)">Master of Hospitality Management (M.H.M)</option>
                                                                <option value="master of human resource management (m.h.r.m)">Master of Human Resource Management (M.H.R.M)</option>
                                                                <option value="master of industrial relation and personal management (mir and pm)">Master of Industrial Relation and Personal Management (MIR and PM)</option>
                                                                <option value="master of international business (m.i.b)">Master of International Business (M.I.B)</option>
                                                                <option value="master of journalism (m.j)">Master of Journalism (M.J)</option>
                                                                <option value="master of labour management (m.l.m)">Master of Labour Management (M.L.M)</option>
                                                                <option value="master of laws (m.l)">Master of Laws (M.L)</option>
                                                                <option value="master of library and information science (m.l.i.sc)">Master of Library and Information Science (M.L.I.Sc)</option>
                                                                <option value="master of library science (m.l.sc)">Master of Library Science (M.L.Sc)</option>
                                                                <option value="master of management program (m.m.p)">Master of Management Program (M.M.P)</option>
                                                                <option value="master of management studies (m.m.s)">Master of Management Studies (M.M.S)</option>
                                                                <option value="master of marketing management (m.m.m)">Master of Marketing Management (M.M.M)</option>
                                                                <option value="master of occupational theraphy (m.o.t)">Master of Occupational Theraphy (M.O.T)</option>
                                                                <option value="master of performance management (m.p.m)">Master of Performance Management (M.P.M)</option>
                                                                <option value="master of performing arts (m.p.a)">Master of Performing Arts (M.P.A)</option>
                                                                <option value="master of personal management and industrial relation (mpm and ir)">Master of Personal Management and Industrial Relation (MPM and IR)</option>
                                                                <option value="master of personnel management (mpm)">Master of Personnel Management (MPM)</option>
                                                                <option value="master of physical education (m.p.ed)">Master Of Physical Education (M.P.Ed)</option>
                                                                <option value="master of physiotheraphy (m.p.t)">Master of Physiotheraphy (M.P.T)</option>
                                                                <option value="master of psychiatric epidemiology (m.p.e)">Master of Psychiatric Epidemiology (M.P.E)</option>
                                                                <option value="master of public health (m.p.h)">Master of Public Health (M.P.H)</option>
                                                                <option value="master of social dynamics (m.s.d)">Master of Social Dynamics (M.S.D)</option>
                                                                <option value="master of social work (m.s.w)">Master of Social Work (M.S.W)</option>
                                                                <option value="master of theology (m.th)">Master of Theology (M.Th)</option>
                                                                <option value="master of tourism administrations (m.t.a)">Master of Tourism Administrations (M.T.A)</option>
                                                                <option value="master of tourism management (m.t.m)">Master of Tourism Management (M.T.M)</option>
                                                                <option value="master of veterinary science (m.v.sc)">Master of Veterinary Science (M.V.Sc)</option>
                                                                <option value="master of visual arts (m.v.a)">Master of Visual Arts (M.V.A)</option>
                                                                <option value="masters in design (m.des)">Masters in Design (M.Des)</option>
                                                                <option value="masters in international management (m.i.m)">Masters in International Management (M.I.M)</option>
                                                                <option value="masters in public systems management (m.p.s.m)">Masters in Public Systems Management (M.P.S.M)</option>
                                                                <option value="masters of hospitality and tourism management (m.h.t.m)">Masters of Hospitality and Tourism Management (M.H.T.M)</option>
                                                                <option value="masters programme in international business (m.p.i.b)">Masters Programme in International Business (M.P.I.B)</option>
                                                                <option value="mba - master of business administration">MBA - Master of Business Administration</option>
                                                                <option value="mca">MCA</option>
                                                                <option value="mca - master of computer applications">MCA - Master of Computer Applications</option>
                                                                <option value="montessory">Montessory</option>
                                                                <option value="mscit">MSCIT</option>
                                                                <option value="net - national eligibility test">NET - National Eligibility Test</option>
                                                                <option value="no education">No Education</option>
                                                                <option value="ntt - nursery teacher training">NTT - Nursery Teacher Training</option>
                                                                <option value="pgdm - post graduate diploma in management">PGDM - Post Graduate Diploma in Management</option>
                                                                <option value="ph.d - doctor of philosophy">Ph.D - Doctor of Philosophy</option>
                                                                <option value="post graduation">Post Graduation</option>
                                                                <option value="primary">Primary</option>
                                                                <option value="stc mp">STC MP</option>
                                                            </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-67-7tdt" style={{ width: "224px" }}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-father_qualification-ja-container" aria-controls="select2-father_qualification-ja-container"><span className="select2-selection__rendered" id="select2-father_qualification-ja-container" role="textbox" aria-readonly="true" title=""><span className="select2-selection__placeholder"></span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <select className="form-select select2 select2-hidden-accessible" data-placeholder="" name="parentDetails.Guardian.qualification" data-select2-id="select2-data-69-5dkg" tabIndex="-1" aria-hidden="true" value={values.parentDetails.Guardian.qualification}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}>
                                                                <option value={values.parentDetails.Guardian.qualification} data-select2-id="select2-data-71-0sbx">{values.parentDetails.Guardian.qualification}</option>
                                                                <option value="10th - high school">10th - High School</option>
                                                                <option value="12th - intermediate">12th - Intermediate</option>
                                                                <option value="advanced program (advanced program)">Advanced Program (Advanced Program)</option>
                                                                <option value="animation, graphics and multimedia">Animation, Graphics and Multimedia</option>
                                                                <option value="aviation courses">Aviation Courses</option>
                                                                <option value="b.arch- bachelor of architecture">B.Arch- Bachelor of Architecture</option>
                                                                <option value="b.com (hons.)">B.Com (Hons.)</option>
                                                                <option value="b.com ll.b. - integrated law program">B.Com LL.B. - Integrated Law Program</option>
                                                                <option value="b.com- bachelor of commerce">B.Com- Bachelor of Commerce</option>
                                                                <option value="b.ed - bachelor of education">B.Ed - Bachelor of Education</option>
                                                                <option value="b.pharma- bachelor of pharmacy">B.Pharma- Bachelor of Pharmacy</option>
                                                                <option value="b.sc- applied geology">B.Sc- Applied Geology</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- interior design">B.Sc- Interior Design</option>
                                                                <option value="b.sc- nursing">B.Sc- Nursing</option>
                                                                <option value="b.sc. – nutrition &amp; dietetics">B.Sc. – Nutrition &amp; Dietetics</option>
                                                                <option value="b.sc. chemistry">B.Sc. Chemistry</option>
                                                                <option value="b.sc. mathematics">B.Sc. Mathematics</option>
                                                                <option value="b.sc.- hospitality and hotel administration">B.Sc.- Hospitality and Hotel Administration</option>
                                                                <option value="b.sc.- information technology">B.Sc.- Information Technology</option>
                                                                <option value="b.sc.- physics">B.Sc.- Physics</option>
                                                                <option value="b.tech - bachelor of technology">B.Tech - Bachelor of Technology</option>
                                                                <option value="ba - bachelor of arts">BA - Bachelor of Arts</option>
                                                                <option value="ba (hons.) in economics">BA (Hons.) in Economics</option>
                                                                <option value="ba + ll.b - integrated law course">BA + LL.B - Integrated Law Course</option>
                                                                <option value="ba/b.sc. liberal arts">BA/B.Sc. Liberal Arts</option>
                                                                <option value="bachelor in aeronautical engineering">Bachelor in Aeronautical Engineering</option>
                                                                <option value="bachelor in automation and robotics">Bachelor in Automation and Robotics</option>
                                                                <option value="bachelor in automobile engineering">Bachelor in Automobile Engineering</option>
                                                                <option value="bachelor in biotechnology engineering">Bachelor in Biotechnology Engineering</option>
                                                                <option value="bachelor in ceramic engineering">Bachelor in Ceramic Engineering</option>
                                                                <option value="bachelor in chemical engineering">Bachelor in Chemical Engineering</option>
                                                                <option value="bachelor in civil engineering">Bachelor in Civil Engineering</option>
                                                                <option value="bachelor in computer science and engineering">Bachelor in Computer Science and Engineering</option>
                                                                <option value="bachelor in construction engineering">Bachelor in Construction Engineering</option>
                                                                <option value="bachelor in electrical and electronics engineering">Bachelor in Electrical and Electronics Engineering</option>
                                                                <option value="bachelor in electronics and communication engineering">Bachelor in Electronics and Communication Engineering</option>
                                                                <option value="bachelor in foreign language">Bachelor in Foreign Language</option>
                                                                <option value="bachelor in instrumentation engineering">Bachelor in Instrumentation Engineering</option>
                                                                <option value="bachelor in petroleum engineering">Bachelor in Petroleum Engineering</option>
                                                                <option value="bachelor in power engineering">Bachelor in Power Engineering</option>
                                                                <option value="bachelor in robotics engineering">Bachelor in Robotics Engineering</option>
                                                                <option value="bachelor in smart manufacturing &amp; automation">Bachelor in Smart Manufacturing &amp; Automation</option>
                                                                <option value="bachelor in structural engineering">Bachelor in Structural Engineering</option>
                                                                <option value="bachelor in textile engineering">Bachelor in Textile Engineering</option>
                                                                <option value="bachelor in transportation engineering">Bachelor in Transportation Engineering</option>
                                                                <option value="bachelor of design (b. design)">Bachelor of Design (B. Design)</option>
                                                                <option value="bachelor of design in accessory design">Bachelor of Design in Accessory Design</option>
                                                                <option value="bachelor of design in ceramic design">Bachelor of Design in Ceramic Design</option>
                                                                <option value="bachelor of design in fashion design">Bachelor of Design in fashion Design</option>
                                                                <option value="bachelor of design in graphic design">Bachelor of Design in Graphic Design</option>
                                                                <option value="bachelor of design in industrial design">Bachelor of Design in Industrial Design</option>
                                                                <option value="bachelor of design in jewellery design">Bachelor of Design in Jewellery Design</option>
                                                                <option value="bachelor of design in leather design">Bachelor of Design in Leather Design</option>
                                                                <option value="bachelor of performing arts">Bachelor of Performing Arts</option>
                                                                <option value="bachelor of physical education (b.p.ed)">Bachelor Of Physical Education (B.P.Ed)</option>
                                                                <option value="bba - bachelor of business administration">BBA - Bachelor of Business Administration</option>
                                                                <option value="bba ll.b - integarted law program">BBA LL.B - Integarted Law Program</option>
                                                                <option value="bbs- bachelor of business studies">BBS- Bachelor of Business Studies</option>
                                                                <option value="bca">BCA</option>
                                                                <option value="bca- bachelor of computer applications">BCA- Bachelor of Computer Applications</option>
                                                                <option value="bds- bachelor of dental surgery">BDS- Bachelor of Dental Surgery</option>
                                                                <option value="be or beng - bachelor of engineering">BE or BEng - Bachelor of Engineering</option>
                                                                <option value="bem- bachelor of event management">BEM- Bachelor of Event Management</option>
                                                                <option value="bfa- bachelor of fine arts">BFA- Bachelor of Fine Arts</option>
                                                                <option value="bfd- bachelor of fashion designing">BFD- Bachelor of Fashion Designing</option>
                                                                <option value="bjmc- bachelor of journalism and mass communication">BJMC- Bachelor of Journalism and Mass Communication</option>
                                                                <option value="bms- bachelor of management science">BMS- Bachelor of Management Science</option>
                                                                <option value="bpt- bachelor of physiotherapy">BPT- Bachelor of Physiotherapy</option>
                                                                <option value="bsw- bachelor of social work">BSW- Bachelor of Social Work</option>
                                                                <option value="bte - bachelor of technical education">BTE - Bachelor of Technical Education</option>
                                                                <option value="bttm- bachelor of travel and tourism management">BTTM- Bachelor of Travel and Tourism Management</option>
                                                                <option value="ca- chartered accountancy">CA- Chartered Accountancy</option>
                                                                <option value="cs- company secretary">CS- Company Secretary</option>
                                                                <option value="ctet - central teacher eligibility test">CTET - Central Teacher Eligibility Test</option>
                                                                <option value="d.ed (diploma in education)">D.Ed (Diploma in Education)</option>
                                                                <option value="d.pharma - diploma in pharmacy">D.Pharma - Diploma in Pharmacy</option>
                                                                <option value="e.f.p.m - executive fellow program in management">E.F.P.M - Executive Fellow Program In Management</option>
                                                                <option value="e.m.p - executive management programme">E.M.P - Executive Management Programme</option>
                                                                <option value="ecced">ECCed</option>
                                                                <option value="executive post graduate certificate (executive pg certificate)">Executive Post Graduate Certificate (Executive PG Certificate)</option>
                                                                <option value="executive post graduate programme (executive pg programme)">Executive Post Graduate Programme (Executive PG Programme)</option>
                                                                <option value="fellow programme (fellow programme)">Fellow Programme (Fellow Programme)</option>
                                                                <option value="graduation">GRADUATION</option>
                                                                <option value="htet - haryana teacher eligibility test">HTET - Haryana Teacher Eligibility Test</option>
                                                                <option value="international programme (international programme)">International Programme (International Programme)</option>
                                                                <option value="ix">IX</option>
                                                                <option value="jbt - junior basic training">JBT - Junior Basic Training</option>
                                                                <option value="junior high school">Junior High School</option>
                                                                <option value="ll.m - master of law">LL.M - Master of Law</option>
                                                                <option value="llb - bachelor of legislative law">LLB - Bachelor of Legislative Law</option>
                                                                <option value="m.com - master of commerce">M.Com - Master of Commerce</option>
                                                                <option value="m.d - doctor of medicine">M.D - Doctor of Medicine</option>
                                                                <option value="m.d.s - master of dental surgery">M.D.S - Master of Dental Surgery</option>
                                                                <option value="m.e - master of engineering">M.E - Master of Engineering</option>
                                                                <option value="m.ed - master of education">M.Ed - Master of Education</option>
                                                                <option value="m.ed - masters in education">M.Ed - Masters in Education</option>
                                                                <option value="m.ed ai -  artificial intelligence">M.Ed AI -  Artificial Intelligence</option>
                                                                <option value="m.f.a - master of fine arts">M.F.A - Master of Fine Arts</option>
                                                                <option value="m.f.c - master of finance and control">M.F.C - Master of Finance And Control</option>
                                                                <option value="m.pharma - master of pharmacy">M.Pharma - Master of Pharmacy</option>
                                                                <option value="m.phil - master of philosophy">M.Phil - Master of Philosophy</option>
                                                                <option value="m.s - master of science">M.S - Master of Science</option>
                                                                <option value="m.sc - master of science">M.Sc - Master of Science</option>
                                                                <option value="m.tech - master of technology">M.Tech - Master of Technology</option>
                                                                <option value="m.voc - master of vocational">M.Voc - Master of Vocational</option>
                                                                <option value="ma - master of arts">MA - Master of Arts</option>
                                                                <option value="management development programme (m.d.p)">Management Development Programme (M.D.P)</option>
                                                                <option value="master of architecture (m.arch)">Master of Architecture (M.Arch)</option>
                                                                <option value="master of arts in management (m.a.m)">Master of Arts in Management (M.A.M)</option>
                                                                <option value="master of arts in personal management (m.a.p.m)">Master of Arts in Personal Management (M.A.P.M)</option>
                                                                <option value="master of business economics (m.b.e)">Master of Business Economics (M.B.E)</option>
                                                                <option value="master of business laws (m.b.l)">Master of Business Laws (M.B.L)</option>
                                                                <option value="master of business management (m.b.m)">Master of Business Management (M.B.M)</option>
                                                                <option value="master of business studies (m.b.s)">Master of Business Studies (M.B.S)</option>
                                                                <option value="master of chirurgical (m.ch)">Master of Chirurgical (M.Ch)</option>
                                                                <option value="master of communication and journalism (m.c.j)">Master Of Communication And Journalism (M.C.J)</option>
                                                                <option value="master of comparative laws (m.c.l)">Master of Comparative Laws (M.C.L)</option>
                                                                <option value="master of computer management (m.c.m)">Master of Computer Management (M.C.M)</option>
                                                                <option value="master of corporate secretaryship (m.c.s)">Master of Corporate Secretaryship (M.C.S)</option>
                                                                <option value="master of film management (m.f.m)">Master of Film Management (M.F.M)</option>
                                                                <option value="master of financial services (m.f.s)">Master of Financial Services (M.F.S)</option>
                                                                <option value="master of fishery sciences (m.f.sc)">Master of Fishery Sciences (M.F.Sc)</option>
                                                                <option value="master of foreign trade (m.f.t)">Master of Foreign Trade (M.F.T)</option>
                                                                <option value="master of health science (m.h.sc)">Master Of Health Science (M.H.Sc)</option>
                                                                <option value="master of hospital administration (m.h.a)">Master of Hospital Administration (M.H.A)</option>
                                                                <option value="master of hospitality and hotel management (m.h.h.m)">Master of Hospitality And Hotel Management (M.H.H.M)</option>
                                                                <option value="master of hospitality management (m.h.m)">Master of Hospitality Management (M.H.M)</option>
                                                                <option value="master of human resource management (m.h.r.m)">Master of Human Resource Management (M.H.R.M)</option>
                                                                <option value="master of industrial relation and personal management (mir and pm)">Master of Industrial Relation and Personal Management (MIR and PM)</option>
                                                                <option value="master of international business (m.i.b)">Master of International Business (M.I.B)</option>
                                                                <option value="master of journalism (m.j)">Master of Journalism (M.J)</option>
                                                                <option value="master of labour management (m.l.m)">Master of Labour Management (M.L.M)</option>
                                                                <option value="master of laws (m.l)">Master of Laws (M.L)</option>
                                                                <option value="master of library and information science (m.l.i.sc)">Master of Library and Information Science (M.L.I.Sc)</option>
                                                                <option value="master of library science (m.l.sc)">Master of Library Science (M.L.Sc)</option>
                                                                <option value="master of management program (m.m.p)">Master of Management Program (M.M.P)</option>
                                                                <option value="master of management studies (m.m.s)">Master of Management Studies (M.M.S)</option>
                                                                <option value="master of marketing management (m.m.m)">Master of Marketing Management (M.M.M)</option>
                                                                <option value="master of occupational theraphy (m.o.t)">Master of Occupational Theraphy (M.O.T)</option>
                                                                <option value="master of performance management (m.p.m)">Master of Performance Management (M.P.M)</option>
                                                                <option value="master of performing arts (m.p.a)">Master of Performing Arts (M.P.A)</option>
                                                                <option value="master of personal management and industrial relation (mpm and ir)">Master of Personal Management and Industrial Relation (MPM and IR)</option>
                                                                <option value="master of personnel management (mpm)">Master of Personnel Management (MPM)</option>
                                                                <option value="master of physical education (m.p.ed)">Master Of Physical Education (M.P.Ed)</option>
                                                                <option value="master of physiotheraphy (m.p.t)">Master of Physiotheraphy (M.P.T)</option>
                                                                <option value="master of psychiatric epidemiology (m.p.e)">Master of Psychiatric Epidemiology (M.P.E)</option>
                                                                <option value="master of public health (m.p.h)">Master of Public Health (M.P.H)</option>
                                                                <option value="master of social dynamics (m.s.d)">Master of Social Dynamics (M.S.D)</option>
                                                                <option value="master of social work (m.s.w)">Master of Social Work (M.S.W)</option>
                                                                <option value="master of theology (m.th)">Master of Theology (M.Th)</option>
                                                                <option value="master of tourism administrations (m.t.a)">Master of Tourism Administrations (M.T.A)</option>
                                                                <option value="master of tourism management (m.t.m)">Master of Tourism Management (M.T.M)</option>
                                                                <option value="master of veterinary science (m.v.sc)">Master of Veterinary Science (M.V.Sc)</option>
                                                                <option value="master of visual arts (m.v.a)">Master of Visual Arts (M.V.A)</option>
                                                                <option value="masters in design (m.des)">Masters in Design (M.Des)</option>
                                                                <option value="masters in international management (m.i.m)">Masters in International Management (M.I.M)</option>
                                                                <option value="masters in public systems management (m.p.s.m)">Masters in Public Systems Management (M.P.S.M)</option>
                                                                <option value="masters of hospitality and tourism management (m.h.t.m)">Masters of Hospitality and Tourism Management (M.H.T.M)</option>
                                                                <option value="masters programme in international business (m.p.i.b)">Masters Programme in International Business (M.P.I.B)</option>
                                                                <option value="mba - master of business administration">MBA - Master of Business Administration</option>
                                                                <option value="mca">MCA</option>
                                                                <option value="mca - master of computer applications">MCA - Master of Computer Applications</option>
                                                                <option value="montessory">Montessory</option>
                                                                <option value="mscit">MSCIT</option>
                                                                <option value="net - national eligibility test">NET - National Eligibility Test</option>
                                                                <option value="no education">No Education</option>
                                                                <option value="ntt - nursery teacher training">NTT - Nursery Teacher Training</option>
                                                                <option value="pgdm - post graduate diploma in management">PGDM - Post Graduate Diploma in Management</option>
                                                                <option value="ph.d - doctor of philosophy">Ph.D - Doctor of Philosophy</option>
                                                                <option value="post graduation">Post Graduation</option>
                                                                <option value="primary">Primary</option>
                                                                <option value="stc mp">STC MP</option>
                                                            </select><span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-70-euw1" style={{ width: "224px" }}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-guardian_qualification-bh-container" aria-controls="select2-guardian_qualification-bh-container"><span className="select2-selection__rendered" id="select2-guardian_qualification-bh-container" role="textbox" aria-readonly="true" title=""><span className="select2-selection__placeholder"></span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Residential Address</th>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Mother.residentialAddress" />
                                                            {errors.parentDetails?.Mother?.residentialAddress && touched.parentDetails?.Mother?.residentialAddress && <div className="text-danger">{errors.parentDetails?.Mother?.residentialAddress}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Father.residentialAddress" />
                                                            {errors.parentDetails?.Father?.residentialAddress && touched.parentDetails?.Father?.residentialAddress && <div className="text-danger">{errors.parentDetails?.Father?.residentialAddress}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Guardian.residentialAddress" />
                                                            {errors?.parentDetails?.Guardian?.residentialAddress && touched?.parentDetails?.Guardian?.residentialAddress && <div className="text-danger">{errors.parentDetails?.Guardian.residentialAddress}</div>}
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>Occupation</th>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Mother.occupation" />
                                                            {errors?.parentDetails?.Mother?.occupation && touched.parentDetails?.Mother?.occupation && <div className="text-danger">{errors?.parentDetails?.Mother?.occupation}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Father.occupation" />
                                                            {errors?.parentDetails?.Father?.occupation && touched?.parentDetails?.Father?.occupation && <div className="text-danger">{errors?.parentDetails?.Father?.occupation}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Guardian.occupation" />
                                                            {errors?.parentDetails?.Guardian?.occupation && touched.parentDetails?.Guardian?.occupation && <div className="text-danger">{errors.parentDetails?.Guardian?.occupation}</div>}
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>Official Address</th>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Mother.officialAddress" />
                                                            {errors?.parentDetails?.Mother?.officialAddress && touched?.parentDetails?.Mother?.officialAddress && <div className="text-danger">{errors?.parentDetails?.Mother?.officialAddress}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Father.officialAddress" />
                                                            {errors?.parentDetails?.Father?.officialAddress && touched?.parentDetails?.Father?.officialAddress && <div className="text-danger">{errors?.parentDetails?.Father?.officialAddress}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Guardian.officialAddress" />
                                                            {errors?.parentDetails?.Guardian?.officialAddress && touched?.parentDetails?.Guardian?.officialAddress && <div className="text-danger">{errors?.parentDetails?.Guardian?.officialAddress}</div>}
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>Annual Income</th>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Mother.annualIncome" />
                                                            {errors?.parentDetails?.Mother?.annualIncome && touched?.parentDetails?.Mother?.annualIncome && <div className="text-danger">{errors?.parentDetails?.Mother?.annualIncome}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Father.annualIncome" />
                                                            {errors?.parentDetails?.Father?.annualIncome && touched?.parentDetails?.Father?.annualIncome && <div className="text-danger">{errors.parentDetails?.Father?.annualIncome}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="text" className='form-control' name="parentDetails.Guardian.annualIncome" />
                                                            {errors.parentDetails?.Guardian?.annualIncome && touched?.parentDetails?.Guardian?.annualIncome && <div className="text-danger">{errors.parentDetails?.Guardian?.annualIncome}</div>}
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>Email Address</th>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="email" className="form-control" name="parentDetails.Mother.email" />
                                                            {errors?.parentDetails?.Mother?.email && touched?.parentDetails?.Mother?.email && <div className="text-danger">{errors?.parentDetails?.Mother?.email}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="email" className="form-control" name="parentDetails.Father.email" />
                                                            {errors?.parentDetails?.Father?.email && touched?.parentDetails?.Father?.email && <div className="text-danger">{errors?.parentDetails?.Father?.email}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="email" className="form-control" name="parentDetails.Guardian.email" />
                                                            {errors?.parentDetails?.Guardian?.email && touched?.parentDetails?.Guardian?.email && <div className="text-danger">{errors?.parentDetails?.Guardian?.email}</div>}
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th>Contact No.</th>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="number" className="form-control" name="parentDetails.Mother.contactNumber" />
                                                            {errors?.parentDetails?.Mother?.contactNumber && touched?.parentDetails?.Mother?.contactNumber && <div className="text-danger">{errors?.parentDetails?.Mother?.contactNumber}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="number" className="form-control" name="parentDetails.Father.contactNumber" />
                                                            {errors?.parentDetails?.Father?.contactNumber && touched?.parentDetails?.Father?.contactNumber && <div className="text-danger">{errors?.parentDetails?.Father?.contactNumber}</div>}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-grid">
                                                            <Field type="number" className="form-control" name="parentDetails.Guardian.contactNumber" />
                                                            {errors?.parentDetails?.Guardian?.contactNumber && touched?.parentDetails?.Guardian?.contactNumber && <div className="text-danger">{errors?.parentDetails?.Guardian?.contactNumber}</div>}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                    <button type="reset" className="btn btn-danger w-25 me-3" onClick={() => { Navigate('/manage-accounts'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-success w-25 ms-3" >
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default EditParents
