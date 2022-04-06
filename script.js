const initialData = {
    education: [
        {
            id: 1,
            data: {
                institute: "LNM Institute of Information Technology",
                affiliation: "B.Tech-CSE",
                score: "7.33 / 10.0",
            },
        },
        {
            id: 2,
            data: {
                institute: "Jayshree Periwal High School, Jaipur",
                affiliation: "12th-CBSE",
                score: "84.80 / 100.00",
            },
        },
        {
            id: 3,
            data: {
                institute: "Warren Academy School, Jaipur",
                affiliation: "10th-CBSE",
                score: "95.00 / 100.00",
            },
        },
    ],
    projects: [
        {
            id: 1,
            data: {
                title: "DashCode Andriod App",
                description: `A dashboard for competitive programmers. 

A user can monitor his progress on different competitive programming platforms (such as CodeForces, CodeChef) in a single app. The app also shows a list of upcoming contests on these websites. 

The app was built from scratch by me using MVVM architecture and uses the latest Android libraries (Recycler Views, Data Binding, Retrofit, Room Database) and design principles (Repository, Factory design). The app fetches user's performance data from multiple REST APIs for different platforms and adapts it to be presented in graphs to deliver a consistent UI for all platforms. The data is cached in an offline database so that it doesn't need to be loaded every time the app is launched. The app also uses another API to get a list of upcoming contests from all major platforms. `,

                link: "https://github.com/nishchay-v/DashCode",
                keySkills:
                    "Android Development, Andriod Studio, Kotlin, XML, RESTful API",
            },
        },
    ],
    interests: [
        {
            id: 1,
            data: {
                heading: "Technical: ",
                list: "Machine Learning, Android Development, Blockchain",
            },
        },
        {
            id: 2,
            data: {
                heading: "Personal: ",
                list: "Reading, Photography, Space, History",
            },
        },
    ],
    skills: [
        { id: 1, data: { skill: "Python" } },
        { id: 2, data: { skill: "Data Structures Algorithms" } },
        { id: 3, data: { skill: "C++" } },
        { id: 4, data: { skill: "Android Development" } },
        { id: 5, data: { skill: "MySQL" } },
        { id: 6, data: { skill: "Object-Oriented Programming" } },
    ],
    info: [
        {
            id: 1,
            data: {
                name: "Nishchay Vashistha",
                phone: "+91-9672988857",
                email: "18ucs114@lnmiit.ac.in",
                address: "Jaipur, Rajasthan, India - 302021",
            },
        },
    ],
    details: [
        {
            id: 1,
            data: {
                gender: "Male",
                dob: "June 27, 2000 ",
                maritalStatus: "Unmarried",
                languages: "English, Hindi",
                currentAddress:
                    " 99-99A,Parmeshwari Villa,Kanak Vihar, Kamla Nehru Nagar, Ajmer Road, Jaipur, Rajasthan, India Pincode - 302021",
                phoneNumbers: "+91-9672988857, +91-9414246912",
                emailId: "18ucs114@lnmiit.ac.in",
            },
        },
    ],
};

const dataFields = {
    education: ["institute", "affiliation", "score"],
    projects: ["title", "description", "link", "keySkills"],
    interests: ["heading", "list"],
    skills: ["skill"],
    info: ["name", "phone", "email", "address"],
    details: [
        "gender",
        "dob",
        "maritalStatus",
        "languages",
        "currentAddress",
        "phoneNumbers",
        "emailId",
    ],
};

class Model {
    addSubsection(updatedData) {
        const sub = {
            id:
                this.data.length > 0
                    ? this.data[this.data.length - 1].id + 1
                    : 1,
            data: updatedData,
        };
        this.data.push(sub);
        this.onListChanged(this.data);
    }

    deleteSubsection(id) {
        this.data = this.data.filter((sub) => sub.id != id);
        this.onListChanged(this.data);
    }

    deleteAll() {
        this.data = [];
    }

    bindOnListChanged(callback) {
        this.onListChanged = callback;
    }
}

class View {
    constructor(section) {
        if (section) {
            this.section = section;

            this.editor = this.getElement("#input-section-" + section);
            this.preview = this.getElement("#" + section);

            this.inputList = this.createElement("ul");
            this.inputList.id = "input-list-" + section;

            this.addButton = this.createElement("button", "add-button");
            this.addButton.textContent = "Add";

            this.editor.append(this.inputList, this.addButton);

            this.contentList = this.createElement("ul", "list-" + section);
            this.preview.append(this.contentList);
        }
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    getInputValues(id) {
        const updatedData = {};
        dataFields[this.section].forEach((field) => {
            updatedData[field] = this.getElement(
                "#input-" + field + "-" + id
            ).value;
        });
        return updatedData;
    }

    setInputValues(id, data) {
        dataFields[this.section].forEach((field) => {
            this.getElement("#input-" + field + "-" + id).value = data[field];
        });
    }

    createInputFields(fieldData) {
        const inputFields = [];
        dataFields[this.section].forEach((field) => {
            const input = this.createElement("input");
            input.type = "text";
            input.id = "input-" + field + "-" + fieldData.id;
            input.value = fieldData.data[field];
            const label = this.createElement("label");
            label.for = label.id;
            label.textContent = field;
            inputFields.push(label, input);
        });
        return inputFields;
    }

    bindActions(addHandler, deleteHandler, submitHandler, resetHandler) {
        this.editor.addEventListener("click", (event) => {
            const ElementId = event.target.parentElement.id;
            const id =
                parseInt(
                    ElementId.replace("input-data-" + this.section + "-", "")
                ) || 1;
            switch (event.target.className) {
                case "add-button":
                    addHandler();
                    break;
                case "delete-button":
                    deleteHandler(id);
                    break;
                case "submit-button":
                    const updatedData = this.getInputValues(id);
                    submitHandler(id, updatedData);
                    break;
                case "reset-button":
                    resetHandler(id);
                    break;
                default:
                    break;
            }
        });
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindActions(
            this.handleAddSubsection,
            this.handleDelete,
            this.handleSubmit,
            this.handleReset
        );
        this.model.bindOnListChanged(this.onListChanged);
        this.onListChanged(this.model.data);
    }
    onListChanged = (data) => {
        this.view.displayContents(this.model.data);
        this.view.displayInputs(data);
    };
    handleDelete = (id) => {
        this.model.deleteSubsection(id);
    };
    handleSubmit = (updateId) => {
        const sub = this.model.data.find(({ id }) => id === updateId);
        const updatedData = this.view.getInputValues(updateId);
        sub.data = updatedData;
        this.view.displayContents(this.model.data);
    };
    handleReset = (updateId) => {
        const data = this.model.data.find(({ id }) => id === updateId).data;
        this.view.setInputValues(updateId, data);
    };
    handleAddSubsection = () => {
        this.model.addSubsection(this.createEmptySub());
    };
}

class EducationModel extends Model {
    constructor() {
        super();
        this.data = initialData.education;
    }
}

class ProjectsModel extends Model {
    constructor() {
        super();
        this.data = initialData.projects;
    }
}

class InterestsModel extends Model {
    constructor() {
        super();
        this.data = initialData.interests;
    }
}

class SkillsModel extends Model {
    constructor() {
        super();
        this.data = initialData.skills;
    }
}

class InfoModel extends Model {
    constructor() {
        super();
        this.data = initialData.info;
    }
}

class DetailsModel extends Model {
    constructor() {
        super();
        this.data = initialData.details;
    }
}

class EducationView extends View {
    constructor() {
        super("education");
    }

    displayInputs(data) {
        while (this.inputList.firstChild) {
            this.inputList.removeChild(this.inputList.firstChild);
        }

        data.forEach((sub) => {
            const li = this.createElement("li");
            li.id = "input-data-education-" + sub.id;

            const form = this.createElement("form");

            const inputFields = this.createInputFields(sub);

            const submitButton = this.createElement("button", "submit-button");
            submitButton.textContent = "Submit";

            const resetButton = this.createElement("button", "reset-button");
            resetButton.textContent = "Reset";

            const deleteButton = this.createElement("button", "delete-button");

            deleteButton.textContent = "X";

            form.append(...inputFields);

            li.append(form, submitButton, resetButton, deleteButton);

            this.inputList.append(li);
        });
    }

    displayContents(data) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        data.forEach((sub) => {
            const li = this.createElement("li", "subsection");
            li.classList.add("boxed");
            li.id = "data-education-" + sub.id;

            const institute = this.createElement("div", "bold");
            institute.textContent = sub.data.institute;

            const details = this.createElement("div");
            const affiliation = this.createElement("span");
            affiliation.textContent = sub.data.affiliation;
            const scoreText = this.createElement("span");
            scoreText.textContent = " | Score: ";
            const score = this.createElement("span");
            score.textContent = sub.data.score;
            details.append(affiliation, scoreText, score);

            li.append(institute, details);

            this.contentList.append(li);
        });
    }
}

class ProjectsView extends View {
    constructor() {
        super("projects");
    }

    displayInputs(data) {
        while (this.inputList.firstChild) {
            this.inputList.removeChild(this.inputList.firstChild);
        }

        data.forEach((sub) => {
            const li = this.createElement("li");
            li.id = "input-data-projects-" + sub.id;

            const form = this.createElement("form");

            const submitButton = this.createElement("button", "submit-button");
            submitButton.textContent = "Submit";

            const resetButton = this.createElement("button", "reset-button");
            resetButton.textContent = "Reset";

            const deleteButton = this.createElement("button", "delete-button");

            deleteButton.textContent = "X";

            const inputFields = this.createInputFields(sub);

            form.append(...inputFields);

            li.append(form, submitButton, resetButton, deleteButton);

            this.inputList.append(li);
        });
    }

    displayContents(data) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        data.forEach((sub) => {
            const li = this.createElement("li", "subsection");
            li.classList.add("boxed");
            li.id = "data-projects-" + sub.id;

            const title = this.createElement("div", "bold");
            title.textContent = sub.data.title;

            const skillText = this.createElement("span");
            skillText.textContent = "Key Skills: ";
            const skillList = this.createElement("span");

            skillList.textContent = sub.data.keySkills;

            const description = this.createElement("p");
            description.textContent = sub.data.description;

            const link = this.createElement("a");
            link.setAttribute("href", sub.link);
            link.setAttribute("target", "_blank");
            link.textContent = "Project Link";

            li.append(title, skillText, skillList, description, link);

            this.contentList.append(li);
        });
    }
}

class InterestsView extends View {
    constructor() {
        super("interests");
    }

    displayInputs(data) {
        while (this.inputList.firstChild) {
            this.inputList.removeChild(this.inputList.firstChild);
        }

        data.forEach((sub) => {
            const li = this.createElement("li");
            li.id = "input-data-interests-" + sub.id;

            const form = this.createElement("form");

            const inputFields = this.createInputFields(sub);

            const submitButton = this.createElement("button", "submit-button");
            submitButton.textContent = "Submit";

            const resetButton = this.createElement("button", "reset-button");
            resetButton.textContent = "Reset";

            const deleteButton = this.createElement("button", "delete-button");

            deleteButton.textContent = "X";

            form.append(...inputFields);

            li.append(form, submitButton, resetButton, deleteButton);

            this.inputList.append(li);
        });
    }

    displayContents(data) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        data.forEach((sub) => {
            const li = this.createElement("li", "subsection");
            li.id = "data-interests-" + sub.id;

            const heading = this.createElement("span", "bold");
            heading.textContent = sub.data.heading;

            const listSp = this.createElement("span");
            listSp.textContent = sub.data.list;

            li.append(heading, listSp);

            this.contentList.append(li);
        });
    }
}

class SkillsView extends View {
    constructor() {
        super("skills");
        this.inputList.className = "h_list";
        this.contentList.classList = "h_list";
    }

    displayInputs(data) {
        while (this.inputList.firstChild) {
            this.inputList.removeChild(this.inputList.firstChild);
        }

        data.forEach((sub) => {
            const li = this.createElement("li", "bubble");
            li.id = "input-data-skills-" + sub.id;

            const inputSkill = this.createElement("input", "small-input-field");
            inputSkill.type = "text";
            inputSkill.id = "input-skill-" + sub.id;
            inputSkill.value = sub.data.skill;

            const submitButton = this.createElement("button", "submit-button");
            submitButton.textContent = "Submit";

            const resetButton = this.createElement("button", "reset-button");
            resetButton.textContent = "Reset";

            const deleteButton = this.createElement("button", "delete-button");
            deleteButton.textContent = "X";

            li.append(inputSkill, submitButton, resetButton, deleteButton);
            this.inputList.append(li);
        });
    }

    displayContents(data) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        data.forEach((sub) => {
            const li = this.createElement("li", "bubble");
            li.textContent = sub.data.skill;
            this.contentList.append(li);
        });
    }
}

class InfoView extends View {
    constructor() {
        super("info");
        this.addButton.style.display = "none";
    }

    displayInputs(data) {
        const li = this.createElement("li");
        li.id = "input-data-info";

        const form = this.createElement("form");
        const field = data[0];

        const inputFields = this.createInputFields(field);

        const submitButton = this.createElement("button", "submit-button");
        submitButton.textContent = "Submit";

        const resetButton = this.createElement("button", "reset-button");
        resetButton.textContent = "Reset";

        form.append(...inputFields);
        li.append(form, submitButton, resetButton);
        this.inputList.append(li);
    }

    displayContents(data) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        const field = data[0];

        const nameLi = this.createElement("li");
        nameLi.id = "name";
        nameLi.textContent = field.data.name;

        const phoneLi = this.createElement("li");
        phoneLi.textContent = "Ph: ";
        const phoneSp = this.createElement("span");
        phoneSp.textContent = field.data.phone;
        phoneLi.append(phoneSp);

        const emailLi = this.createElement("li");
        emailLi.textContent = "Email: ";
        const emailSp = this.createElement("span");
        emailSp.textContent = field.data.email;
        emailLi.append(emailSp);

        const addressLi = this.createElement("li");
        addressLi.textContent = field.data.address;

        this.contentList.append(nameLi, phoneLi, emailLi, addressLi);
    }
}

class DetailsView extends View {
    constructor() {
        super("details");
        this.addButton.style.display = "none";
        this.preview.classList.add("boxed");
    }

    displayInputs(data) {
        const li = this.createElement("li");
        li.id = "input-data-details";

        const form = this.createElement("form");
        const field = data[0];

        const inputFields = this.createInputFields(field);

        const submitButton = this.createElement("button", "submit-button");
        submitButton.textContent = "Submit";

        const resetButton = this.createElement("button");
        resetButton.textContent = "Reset";

        form.append(...inputFields);
        li.append(form, submitButton, resetButton);
        this.inputList.append(li);
    }

    displayContents(data) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        const field = data[0];

        const genderLi = this.createElement("li");
        genderLi.textContent = "Gender: ";
        const genderSp = this.createElement("span");
        genderSp.textContent = field.data.gender;
        genderLi.append(genderSp);

        const dobLi = this.createElement("li");
        dobLi.textContent = "Date of Birth: ";
        const dobSp = this.createElement("span");
        dobSp.textContent = field.data.dob;
        dobLi.append(dobSp);

        const maritalStatusLi = this.createElement("li");
        maritalStatusLi.textContent = "Marital Status: ";
        const maritalStatusSp = this.createElement("span");
        maritalStatusSp.textContent = field.data.maritalStatus;
        maritalStatusLi.append(maritalStatusSp);

        const languagesLi = this.createElement("li");
        languagesLi.textContent = "Known Languages: ";
        const languagesSp = this.createElement("span");
        languagesSp.textContent = field.data.languages;
        languagesLi.append(languagesSp);

        const addressLi = this.createElement("li");
        addressLi.textContent = "Current Address: ";
        const addressSp = this.createElement("span");
        addressSp.textContent = field.data.currentAddress;
        addressLi.append(addressSp);

        const phoneLi = this.createElement("li");
        phoneLi.textContent = "Phone Numbers: ";
        const phoneSp = this.createElement("span");
        phoneSp.textContent = field.data.phoneNumbers;
        phoneLi.append(phoneSp);

        const emailLi = this.createElement("li");
        emailLi.textContent = "Email: ";
        const emailSp = this.createElement("span");
        emailSp.textContent = field.data.emailId;
        emailLi.append(emailSp);

        this.contentList.append(
            genderLi,
            dobLi,
            maritalStatusLi,
            languagesLi,
            addressLi,
            phoneLi,
            emailLi
        );
    }
}

class EducationController extends Controller {
    constructor(model, view) {
        super(model, view);
    }

    createEmptySub = () => {
        return {
            institute: "",
            affiliation: "",
            score: "",
        };
    };
}

class ProjectsController extends Controller {
    constructor(model, view) {
        super(model, view);
    }

    createEmptySub = () => {
        return {
            title: "",
            description: "",
            link: "",
            keySkills: [],
        };
    };
}

class InterestsController extends Controller {
    constructor(model, view) {
        super(model, view);
    }

    createEmptySub = () => {
        return {
            heading: "",
            list: "",
        };
    };
}

class SkillsController extends Controller {
    constructor(model, view) {
        super(model, view);
    }
    createEmptySub = () => {
        const updatedData = { skill: "" };
        return updatedData;
    };
}

class InfoController extends Controller {
    constructor(model, view) {
        super(model, view);
    }
}

class DetailsController extends Controller {
    constructor(model, view) {
        super(model, view);
    }
}

const sectionNames = {
    skills: "KEY EXPERTISE/SKILLS",
    education: "EDUCATION",
    projects: "PROJECTS",
    interests: "PERSONAL INTERESTS/HOBBIES",
    details: "PERSONAL DETAILS",
};

class PreviewView extends View {
    constructor() {
        super();
        const preview = this.getElement("#preview");
        Object.keys(sectionNames).forEach((section) => {
            const heading = this.createElement("div", "section-heading");
            heading.textContent = sectionNames[section];
            const body = this.createElement("div");
            body.id = section;
            preview.append(heading, body);
        });
    }
}

const preview = new PreviewView();

const education = new EducationController(
    new EducationModel(),
    new EducationView()
);

const projects = new ProjectsController(
    new ProjectsModel(),
    new ProjectsView()
);

const interests = new InterestsController(
    new InterestsModel(),
    new InterestsView()
);

const skills = new SkillsController(new SkillsModel(), new SkillsView());

const info = new InfoController(new InfoModel(), new InfoView());

const details = new DetailsController(new DetailsModel(), new DetailsView());
