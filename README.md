# Semi-Freeform Resume Builder with Section Fill-ins and Canvas Editor(Proof of Concept)

This project is built with Javascript, Vite React, and Tailwind CSS, and used the React-Easy-Crop library, React-Konvas library, and jsPDF library for portions of the project.

This project pairs a conventional resume builder (with with their section forms that users can use to input the required details) with a canvas editor to give users a more flexible way of creating their resumes without the hassle of the standard document line-by-line styling.

## Features

This project would allow a user to do the following:

1. Fill in the necessary details of the core sections required on a resume in preset forms.
2. Save the user's inputs on each section to prevent accidental changes.
3. Render each section of the user's inputted details onto a canvas that represents their resume.
4. The rendered details can do the following:
   - Be dragged across the canvas.
   - Be deleted.
   - Scaled to increase/decrease height and width.
   - Adjust font size to be greater or smaller.
   - Change the style of fonts between a selection of web-safe fonts.
5. Download the canvas as pdf with the user's customizations retained.

## Installation and Setup Guide

1. Clone the repository to a local repo.
2. Run `npm install`.
3. Run `npm run dev`.
4. Navigate to `http://localhost:5173/`.

Or

2. Run `docker-compose up`.
3. Navigate to `http://localhost:5173/`.

## Features to Be Implemented

1. User Account Signup and Login
2. User Account-Specific Resume Storage
3. User Account Deletion

## Libraries Used

1. KonvaJS by Anton Lavrenov: https://github.com/konvajs/react-konva
2. React-Easy-Crop by Valentin Herview: https://github.com/ValentinH/react-easy-crop
3. jsPDF : https://github.com/parallax/jsPDF
