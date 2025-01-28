import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function ExamPaper() {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract exam details from the route state
    const exam = location.state?.exam;

    // Dummy questions
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: null, 
        },
        {
            id: 2,
            question: "Which programming language is used for web development?",
            options: ["Python", "C++", "HTML", "Java"],
            answer: null,
        },
        {
            id: 3,
            question: "Who wrote the novel '1984'?",
            options: ["George Orwell", "J.K. Rowling", "Ernest Hemingway", "F. Scott Fitzgerald"],
            answer: null,
        },
    ]);

    const [submitted, setSubmitted] = useState(false);

    // Handle answer selection
    const handleAnswerChange = (questionId, selectedOption) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === questionId ? { ...q, answer: selectedOption } : q
            )
        );
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // Simulate answer submission
        console.log("Submitted Answers:", questions);
        alert("Your answers have been submitted successfully!")
    };

    const handleGoBack = () => navigate(-1);

    if (!exam) {
        return <div>No exam data found. Please navigate from the exams page.</div>;
    }

    return (
        <div className="page-wrapper">
            <div className="container mx-5 mt-5">
                <h1 className="mb-4">Exam Paper: {exam.name}</h1>
                <p><strong>Exam ID:</strong> {exam.id}</p>
                <p><strong>Date:</strong> {exam.date}</p>
                <p><strong>Time:</strong> {exam.start} - {exam.end}</p>

                <form onSubmit={handleSubmit}>
                    {questions.map((q) => (
                        <div key={q.id} className="mb-4">
                            <h5>{q.id}. {q.question}</h5>
                            {q.options.map((option, index) => (
                                <div key={index} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`question-${q.id}`}
                                        id={`question-${q.id}-option-${index}`}
                                        value={option}
                                        checked={q.answer === option}
                                        onChange={() => handleAnswerChange(q.id, option)}
                                        disabled={submitted}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`question-${q.id}-option-${index}`}
                                    >
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="d-flex ">
                        <button
                            type="button"
                            className="btn btn-secondary mx-3"
                            onClick={handleGoBack}
                            disabled={submitted}
                        >
                            Back to Exams
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={submitted}
                        >
                            {submitted ? "Submitted" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ExamPaper;
