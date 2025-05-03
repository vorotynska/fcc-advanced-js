const projectStatus = {
    PENDING: {
        description: "Pending Execution"
    },
    SUCCESS: {
        description: "Executed Successfully"
    },
    FAILURE: {
        description: "Execution Failed"
    },
}

class ProjectIdea {
    constructor(title, description) {
        this.status = projectStatus.PENDING;
        this.title = title;
        this.description = description;
    }

    updateProjectStatus(newStatus) {
        this.status = newStatus;
    }
}

class ProjectIdeaBoard {
    constructor(title) {
        this.title = title;
        this.ideas = [];
    }
    pin(projectIdea) {
        if (projectIdea instanceof ProjectIdea) {
            this.ideas.push(projectIdea);
        }
    }
    unpin(projectIdea) {
        this.ideas = this.ideas.filter(idea => idea !== projectIdea);
    }

    count() {
        return this.ideas.length;
    }

    formatToString() {
        let result = `${this.title} has ${this.count()} idea(s)\n`;
        for (const idea of this.ideas) {
            result += `${idea.title} (${idea.status.description}) - ${idea.description}\n`;
        }
        return result;
    }
}