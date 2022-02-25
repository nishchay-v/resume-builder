class Model {
    addSubsection(newData) {
        const sub = {
            id:
                this.subs.length > 0
                    ? this.subs[this.subs.length - 1].id + 1
                    : 1,
            data: newData,
        };
        this.subs.push(sub);
        this.onListChanged(this.subs);
    }

    deleteSubsection(id) {
        console.log(id);
        this.subs = this.subs.filter((sub) => sub.id != id);
        this.onListChanged(this.subs);
    }

    deleteAll() {
        this.subs = [];
    }

    bindOnListChanged(callback) {
        this.onListChanged = callback;
    }
}

class View {
    constructor(section) {
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
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }
    bindActions(addHandler, deleteHandler, submitHandler, resetHandler) {
        this.editor.addEventListener("click", (event) => {
            const ElementId = event.target.parentElement.id;
            const id =
                parseInt(
                    ElementId.replace("input-subs-" + this.section + "-", "")
                ) || 1;
            switch (event.target.className) {
                case "add-button":
                    addHandler();
                    break;
                case "delete-button":
                    deleteHandler(id);
                    break;
                case "submit-button":
                    console.log("Submit - View");
                    const newData = this.getInputValues(id);
                    submitHandler(id, newData);
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
        this.onListChanged(this.model.subs);
    }
    onListChanged = (subs) => {
        this.view.displayContents(this.model.subs);
        this.view.displayInputs(subs);
    };
    handleDelete = (id) => {
        this.model.deleteSubsection(id);
    };
    handleSubmit = (updateId) => {
        console.log("Submit-Controller - id: " + updateId);
        const sub = this.model.subs.find(({ id }) => id === updateId);
        const newData = this.view.getInputValues(updateId);
        sub.data = newData;
        this.view.displayContents(this.model.subs);
    };
    handleReset = (updateId) => {
        const data = this.model.subs.find(({ id }) => id === updateId).data;
        this.view.setInputValues(updateId, data);
    };
    handleAddSubsection = () => {
        this.model.addSubsection(this.createEmptySub());
    };
}

class EducationModel extends Model {
    constructor() {
        super();
        this.subs = [
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
        ];
    }
}

class ProjectsModel extends Model {
    constructor() {
        super();
        this.subs = [
            {
                id: 1,
                data: {
                    title: "DashCode Andriod App",
                    description: `A dashboard for competitive programmers. 

A user can monitor his progress on different competitive programming platforms (such as CodeForces, CodeChef) in a single app. The app also shows a list of upcoming contests on these websites. 

The app was built from scratch by me using MVVM architecture and uses the latest Android libraries (Recycler Views, Data Binding, Retrofit, Room Database) and design principles (Repository, Factory design). The app fetches user's performance data from multiple REST APIs for different platforms and adapts it to be presented in graphs to deliver a consistent UI for all platforms. The data is cached in an offline database so that it doesn't need to be loaded every time the app is launched. The app also uses another API to get a list of upcoming contests from all major platforms. `,

                    link: "https://github.com/nishchay-v/DashCode",
                    keySkills: [
                        "Android Development",
                        "Andriod Studio",
                        "Kotlin",
                        "XML",
                        "RESTful API",
                    ],
                },
            },
        ];
    }
}

class InterestsModel extends Model {
    constructor() {
        super();
        this.subs = [
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
        ];
    }
}

class SkillsModel extends Model {
    constructor() {
        super();
        this.subs = [
            { id: 1, data: { skill: "Python" } },
            { id: 2, data: { skill: "Data Structures Algorithms" } },
            { id: 3, data: { skill: "C++" } },
            { id: 4, data: { skill: "Android Development" } },
            { id: 5, data: { skill: "MySQL" } },
            { id: 6, data: { skill: "Object-Oriented Programming" } },
        ];
    }
}

class InfoModel extends Model {
    constructor() {
        super();
        this.subs = [
            {
                id: 1,
                data: {
                    name: "Nishchay Vashistha",
                    phone: "+91-9672988857",
                    email: "18ucs114@lnmiit.ac.in",
                    address: "Jaipur, Rajasthan, India - 302021",
                },
            },
        ];
    }
}

class DetailsModel extends Model {
    constructor() {
        super();
        this.subs = [
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
        ];
    }
}

class EducationView extends View {
    constructor() {
        super("education");
    }

    displayInputs(subs) {
        while (this.inputList.firstChild) {
            this.inputList.removeChild(this.inputList.firstChild);
        }

        subs.forEach((sub) => {
            const li = this.createElement("li");
            li.id = "input-subs-education-" + sub.id;

            const form = this.createElement("form");

            const inputInstitute = this.createElement("input");
            inputInstitute.type = "text";
            inputInstitute.id = "input-institute-" + sub.id;
            inputInstitute.value = sub.data.institute;
            const labelInstitute = this.createElement("label");
            labelInstitute.for = inputInstitute.id;
            labelInstitute.textContent = "Institute: ";

            const inputAffiliation = this.createElement("input");
            inputAffiliation.type = "text";
            inputAffiliation.id = "input-affiliation-" + sub.id;
            inputAffiliation.value = sub.data.affiliation;
            const labelAffiliation = this.createElement("label");
            labelAffiliation.for = inputAffiliation.id;
            labelAffiliation.textContent = "Affiliation: ";

            const inputScore = this.createElement("input");
            inputScore.type = "text";
            inputScore.id = "input-score-" + sub.id;
            inputScore.value = sub.data.score;
            const labelScore = this.createElement("label");
            labelScore.for = inputScore.id;
            labelScore.textContent = "Score: ";

            const submitButton = this.createElement("button", "submit-button");
            submitButton.textContent = "Submit";

            const resetButton = this.createElement("button", "reset-button");
            resetButton.textContent = "Reset";

            const deleteButton = this.createElement("button", "delete-button");

            deleteButton.textContent = "X";

            form.append(
                labelInstitute,
                inputInstitute,
                labelAffiliation,
                inputAffiliation,
                labelScore,
                inputScore
            );

            li.append(form, submitButton, resetButton, deleteButton);

            this.inputList.append(li);
        });
    }

    displayContents(subs) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        subs.forEach((sub) => {
            const li = this.createElement("li", "subsection");
            li.classList.add("boxed");
            li.id = "subs-education-" + sub.id;

            const institute = this.createElement("div", "bold");
            institute.textContent = sub.data.institute;

            const details = this.createElement("div");
            const sp1 = this.createElement("span");
            sp1.textContent = sub.data.affiliation;
            const sp2 = this.createElement("span");
            sp2.textContent = " | Score: ";
            const sp3 = this.createElement("span");
            sp3.textContent = sub.data.score;
            details.append(sp1, sp2, sp3);

            li.append(institute, details);

            this.contentList.append(li);
        });
    }

    getInputValues(id) {
        const newData = {
            institute: this.getElement("#input-institute-" + id).value,
            affiliation: this.getElement("#input-affiliation-" + id).value,
            score: this.getElement("#input-score-" + id).value,
        };
        return newData;
    }

    setInputValues(id, data) {
        this.getElement("#input-institute-" + id).value = data.institute;
        this.getElement("#input-affiliation-" + id).value = data.affiliation;
        this.getElement("#input-score-" + id).value = data.score;
    }
}

class ProjectsView extends View {
    constructor() {
        super("projects");
    }

    displayInputs(subs) {
        while (this.inputList.firstChild) {
            this.inputList.removeChild(this.inputList.firstChild);
        }

        subs.forEach((sub) => {
            const li = this.createElement("li");
            li.id = "input-subs-projects-" + sub.id;

            const form = this.createElement("form");

            const inputTitle = this.createElement("input");
            inputTitle.type = "text";
            inputTitle.id = "input-title-" + sub.id;
            inputTitle.value = sub.data.title;
            const labelTitle = this.createElement("label");
            labelTitle.for = labelTitle.id;
            labelTitle.textContent = "Title: ";

            const inputSkills = this.createElement("input");
            inputSkills.type = "text";
            inputSkills.id = "input-project-skills-" + sub.id;
            inputSkills.value = sub.data.keySkills.join(", ");
            const labelSkills = this.createElement("label");
            labelSkills.for = inputSkills.id;
            labelSkills.textContent = "Key Skills: ";

            const inputDescription = this.createElement("textarea");
            // inputDescription.type = "textarea";
            inputDescription.id = "input-description-" + sub.id;
            inputDescription.setAttribute("rows", 5);
            inputDescription.setAttribute("cols", 50);
            inputDescription.value = sub.data.description;
            const labelDescription = this.createElement("label");
            labelDescription.for = inputDescription.id;
            labelDescription.textContent = "Description: ";

            const inputLink = this.createElement("input");
            inputLink.type = "text";
            inputLink.id = "input-link-" + sub.id;
            inputLink.value = sub.data.link;
            const lableLink = this.createElement("label");
            lableLink.for = inputSkills.id;
            lableLink.textContent = "Project Link: ";

            const submitButton = this.createElement("button", "submit-button");
            submitButton.textContent = "Submit";

            const resetButton = this.createElement("button", "reset-button");
            resetButton.textContent = "Reset";

            const deleteButton = this.createElement("button", "delete-button");

            deleteButton.textContent = "X";

            form.append(
                labelTitle,
                inputTitle,
                labelSkills,
                inputSkills,
                labelDescription,
                inputDescription,
                lableLink,
                inputLink
            );

            li.append(form, submitButton, resetButton, deleteButton);

            this.inputList.append(li);
        });
    }

    displayContents(subs) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        subs.forEach((sub) => {
            const li = this.createElement("li", "subsection");
            li.classList.add("boxed");
            li.id = "subs-projects-" + sub.id;

            const title = this.createElement("div", "bold");
            title.textContent = sub.data.title;

            const skillText = this.createElement("span");
            skillText.textContent = "Key Skills: ";
            const skillList = this.createElement("ul", "h_list");
            sub.data.keySkills.forEach((skill) => {
                const skillBubble = this.createElement("li", "bubble");
                skillBubble.textContent = skill;
                skillList.append(skillBubble);
            });

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

    getInputValues(id) {
        const newData = {
            title: this.getElement("#input-title-" + id).value,
            description: this.getElement("#input-description-" + id).value,
            link: this.getElement("#input-link-" + id).value,
            keySkills: this.getElement(
                "#input-project-skills-" + id
            ).value.split(", "),
        };
        return newData;
    }

    setInputValues(id, data) {
        this.getElement("#input-title-" + id).value = data.title;
        this.getElement("#input-description-" + id).value = data.description;
        this.getElement("#input-link-" + id).value = data.link;
        this.getElement("#input-project-skills-" + id).value =
            data.keySkills.join(", ");
    }
}

class InterestsView extends View {
    constructor() {
        super("interests");
    }

    displayInputs(subs) {
        while (this.inputList.firstChild) {
            this.inputList.removeChild(this.inputList.firstChild);
        }

        subs.forEach((sub) => {
            const li = this.createElement("li");
            li.id = "input-subs-interests-" + sub.id;

            const form = this.createElement("form");

            const inputHeading = this.createElement("input");
            inputHeading.type = "text";
            inputHeading.id = "input-heading-" + sub.id;
            inputHeading.value = sub.data.heading;
            const labelHeading = this.createElement("label");
            labelHeading.for = inputHeading.id;
            labelHeading.textContent = "Heading: ";

            const inputList = this.createElement("input");
            inputList.type = "text";
            inputList.id = "input-list-" + sub.id;
            inputList.value = sub.data.list;
            const labelList = this.createElement("label");
            labelList.for = inputList.id;
            labelList.textContent = "List: ";

            const submitButton = this.createElement("button", "submit-button");
            submitButton.textContent = "Submit";

            const resetButton = this.createElement("button", "reset-button");
            resetButton.textContent = "Reset";

            const deleteButton = this.createElement("button", "delete-button");

            deleteButton.textContent = "X";

            form.append(labelHeading, inputHeading, labelList, inputList);

            li.append(form, submitButton, resetButton, deleteButton);

            this.inputList.append(li);
        });
    }

    displayContents(subs) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        subs.forEach((sub) => {
            const li = this.createElement("li", "subsection");
            li.id = "subs-interests-" + sub.id;

            const heading = this.createElement("span", "bold");
            heading.textContent = sub.data.heading;

            const listSp = this.createElement("span");
            listSp.textContent = sub.data.list;

            li.append(heading, listSp);

            this.contentList.append(li);
        });
    }

    getInputValues(id) {
        const newData = {
            heading: this.getElement("#input-heading-" + id).value,
            list: this.getElement("#input-list-" + id).value,
        };
        return newData;
    }

    setInputValues(id, data) {
        this.getElement("#input-heading-" + id).value = data.heading;
        this.getElement("#input-list-" + id).value = data.list;
    }
}

class SkillsView extends View {
    constructor() {
        super("skills");
        this.inputList.className = "h_list";
        this.contentList.classList = "h_list";
    }

    displayInputs(subs) {
        while (this.inputList.firstChild) {
            this.inputList.removeChild(this.inputList.firstChild);
        }

        subs.forEach((sub) => {
            const li = this.createElement("li", "bubble");
            li.id = "input-subs-skills-" + sub.id;

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

    displayContents(subs) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        subs.forEach((sub) => {
            const li = this.createElement("li", "bubble");
            li.textContent = sub.data.skill;
            this.contentList.append(li);
        });
    }

    getInputValues(id) {
        const newData = {
            skill: this.getElement("#input-skill-" + id).value,
        };
        return newData;
    }

    setInputValues(id, data) {
        this.getElement("#input-skill-" + id).value = data.skill;
    }
}

class InfoView extends View {
    constructor() {
        super("info");
        this.addButton.style.display = "none";
    }

    displayInputs(subs) {
        const li = this.createElement("li");
        li.id = "input-subs-info";

        const form = this.createElement("form");

        const inputName = this.createElement("input");
        inputName.type = "text";
        inputName.id = "input-name";
        inputName.value = subs[0].data.name;
        const labelName = this.createElement("label");
        labelName.for = inputName.id;
        labelName.textContent = "Name: ";

        const inputPhone = this.createElement("input");
        inputPhone.type = "text";
        inputPhone.id = "input-phone";
        inputPhone.value = subs[0].data.phone;
        const labelPhone = this.createElement("label");
        labelPhone.for = inputPhone.id;
        labelPhone.textContent = "Phone: ";

        const inputEmail = this.createElement("input");
        inputEmail.type = "text";
        inputEmail.id = "input-email";
        inputEmail.value = subs[0].data.email;
        const labelEmail = this.createElement("label");
        labelEmail.for = inputEmail.id;
        labelEmail.textContent = "Email: ";

        const inputAddress = this.createElement("input");
        inputAddress.type = "text";
        inputAddress.id = "input-address";
        inputAddress.value = subs[0].data.address;
        const labelAddress = this.createElement("label");
        labelAddress.for = inputAddress.id;
        labelAddress.textContent = "Address: ";

        const submitButton = this.createElement("button", "submit-button");
        submitButton.textContent = "Submit";

        const resetButton = this.createElement("button", "reset-button");
        resetButton.textContent = "Reset";

        form.append(
            labelName,
            inputName,
            labelPhone,
            inputPhone,
            labelEmail,
            inputEmail,
            labelAddress,
            inputAddress
        );
        li.append(form, submitButton, resetButton);
        this.inputList.append(li);
    }

    displayContents(subs) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        const nameLi = this.createElement("li");
        nameLi.id = "name";
        nameLi.textContent = subs[0].data.name;

        const phoneLi = this.createElement("li");
        phoneLi.textContent = "Ph: ";
        const phoneSp = this.createElement("span");
        phoneSp.textContent = subs[0].data.phone;
        phoneLi.append(phoneSp);

        const emailLi = this.createElement("li");
        emailLi.textContent = "Email: ";
        const emailSp = this.createElement("span");
        emailSp.textContent = subs[0].data.email;
        emailLi.append(emailSp);

        const addressLi = this.createElement("li");
        addressLi.textContent = subs[0].data.address;

        this.contentList.append(nameLi, phoneLi, emailLi, addressLi);
    }

    getInputValues(id) {
        const newData = {
            name: this.getElement("#input-name").value,
            phone: this.getElement("#input-phone").value,
            email: this.getElement("#input-email").value,
            address: this.getElement("#input-address").value,
        };
        return newData;
    }

    setInputValues(id, data) {
        this.getElement("#input-name").value = data.name;
        this.getElement("#input-phone").value = data.phone;
        this.getElement("#input-email").value = data.email;
        this.getElement("#input-address").value = data.address;
    }
}

class DetailsView extends View {
    constructor() {
        super("details");
        this.addButton.style.display = "none";
    }

    displayInputs(subs) {
        const li = this.createElement("li");
        li.id = "input-subs-details";

        const form = this.createElement("form");

        const inputGender = this.createElement("input");
        inputGender.type = "text";
        inputGender.id = "input-gender";
        inputGender.value = subs[0].data.gender;
        const labelGender = this.createElement("label");
        labelGender.for = inputGender.id;
        labelGender.textContent = "Gender: ";

        const inputDob = this.createElement("input");
        inputDob.type = "text";
        inputDob.id = "input-dob";
        inputDob.value = subs[0].data.dob;
        const labelDob = this.createElement("label");
        labelDob.for = inputDob.id;
        labelDob.textContent = "Date of Birth: ";

        const inputMaritalStatus = this.createElement("input");
        inputMaritalStatus.type = "text";
        inputMaritalStatus.id = "input-marital-status";
        inputMaritalStatus.value = subs[0].data.maritalStatus;
        const labelMaritalStatus = this.createElement("label");
        labelMaritalStatus.for = inputMaritalStatus.id;
        labelMaritalStatus.textContent = "Marital Status: ";

        const inputLanguages = this.createElement("input");
        inputLanguages.type = "text";
        inputLanguages.id = "input-languages";
        inputLanguages.value = subs[0].data.languages;
        const labelLanguages = this.createElement("label");
        labelLanguages.for = inputLanguages.id;
        labelLanguages.textContent = "Known Languages: ";

        const inputAddress = this.createElement("input");
        inputAddress.type = "text";
        inputAddress.id = "input-current-address";
        inputAddress.value = subs[0].data.currentAddress;
        const labelAddress = this.createElement("label");
        labelAddress.for = inputAddress.id;
        labelAddress.textContent = "Current Address: ";

        const inputPhoneNumbers = this.createElement("input");
        inputPhoneNumbers.type = "text";
        inputPhoneNumbers.id = "input-phone-numbers";
        inputPhoneNumbers.value = subs[0].data.phoneNumbers;
        const labelPhoneNumbers = this.createElement("label");
        labelPhoneNumbers.for = inputPhoneNumbers.id;
        labelPhoneNumbers.textContent = "Phone Numbers: ";

        const inputEmailId = this.createElement("input");
        inputEmailId.type = "text";
        inputEmailId.id = "input-email-id";
        inputEmailId.value = subs[0].data.emailId;
        const labelEmail = this.createElement("label");
        labelEmail.for = inputEmailId.id;
        labelEmail.textContent = "Email: ";

        const submitButton = this.createElement("button", "submit-button");
        submitButton.textContent = "Submit";

        const resetButton = this.createElement("button");
        resetButton.textContent = "Reset";

        form.append(
            labelGender,
            inputGender,
            labelDob,
            inputDob,
            labelMaritalStatus,
            inputMaritalStatus,
            labelLanguages,
            inputLanguages,
            labelAddress,
            inputAddress,
            labelPhoneNumbers,
            inputPhoneNumbers,
            labelEmail,
            inputEmailId
        );
        li.append(form, submitButton, resetButton);
        this.inputList.append(li);
    }

    displayContents(subs) {
        while (this.contentList.firstChild) {
            this.contentList.removeChild(this.contentList.firstChild);
        }

        const genderLi = this.createElement("li");
        genderLi.textContent = "Gender: ";
        const genderSp = this.createElement("span");
        genderSp.textContent = subs[0].data.gender;
        genderLi.append(genderSp);

        const dobLi = this.createElement("li");
        dobLi.textContent = "Date of Birth: ";
        const dobSp = this.createElement("span");
        dobSp.textContent = subs[0].data.dob;
        dobLi.append(dobSp);

        const maritalStatusLi = this.createElement("li");
        maritalStatusLi.textContent = "Marital Status: ";
        const maritalStatusSp = this.createElement("span");
        maritalStatusSp.textContent = subs[0].data.maritalStatus;
        maritalStatusLi.append(maritalStatusSp);

        const languagesLi = this.createElement("li");
        languagesLi.textContent = "Known Languages: ";
        const languagesSp = this.createElement("span");
        languagesSp.textContent = subs[0].data.languages;
        languagesLi.append(languagesSp);

        const addressLi = this.createElement("li");
        addressLi.textContent = "Current Address: ";
        const addressSp = this.createElement("span");
        addressSp.textContent = subs[0].data.currentAddress;
        addressLi.append(addressSp);

        const phoneLi = this.createElement("li");
        phoneLi.textContent = "Phone Numbers: ";
        const phoneSp = this.createElement("span");
        phoneSp.textContent = subs[0].data.phoneNumbers;
        phoneLi.append(phoneSp);

        const emailLi = this.createElement("li");
        emailLi.textContent = "Email: ";
        const emailSp = this.createElement("span");
        emailSp.textContent = subs[0].data.emailId;
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

    getInputValues(id) {
        const newData = {
            gender: this.getElement("#input-gender").value,
            dob: this.getElement("#input-dob").value,
            maritalStatus: this.getElement("#input-marital-status").value,
            languages: this.getElement("#input-languages").value,
            currentAddress: this.getElement("#input-current-address").value,
            phoneNumbers: this.getElement("#input-phone-numbers").value,
            emailId: this.getElement("#input-email-id").value,
        };
        return newData;
    }

    setInputValues(id, data) {
        this.getElement("#input-gender").value = data.gender;
        this.getElement("#input-dob" + id).value = data.dob;
        this.getElement("#input-marital-status" + id).value =
            data.maritalStatus;
        this.getElement("#input-languages").value = data.languages;
        this.getElement("#input-current-address").value = data.currentAddress;
        this.getElement("#input-phone-numbers").value = data.phoneNumbers;
        this.getElement("#input-email-id").value = data.emailId;
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
        const newData = { skill: "" };
        return newData;
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
