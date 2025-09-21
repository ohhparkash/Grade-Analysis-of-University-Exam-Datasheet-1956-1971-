function App() {
    return {
        years: [],
        semesters: [],
        classes: [],
        recapid: [],
        grades: [],
  
        selectedYear: null,
        selectedSemester: null,
        selectedClass: null,
        selectedRecapid: null,
  
        async getRecap() {
            const rows = await fetch(`/api/recap`).then(res => res.json());
            this.years = rows;
        },
  
        async getSemesters(year) {
            this.selectedYear = year;
            const rows = await fetch(`/api/semesters/${year}`).then(res => res.json());
            this.semesters = rows;
            this.classes = [];
            this.recapid = [];
            this.grades = [];
        },
  
        async getClasses(semester) {
            this.selectedSemester = semester;
            const rows = await fetch(`/api/classes/${this.selectedYear}/${semester}`).then(res => res.json());
            this.classes = rows;
            this.recapid = [];
            this.grades = [];
        },
  
        async getRecapid(className) {
            this.selectedClass = className;
            const rows = await fetch(`/api/recapid/${this.selectedYear}/${this.selectedSemester}/${className}`).then(res => res.json());
            this.recapid = rows;
            this.grades = [];
        },
  
        async getGradeAnalysis(rid) {
            this.grades = [];
            try {
                const res = await fetch(`/api/grade-analysis/${rid}`);
                const data = await res.json();
                console.log("Fetched grade analysis:", data);
                this.grades = data;
            } catch (err) {
                console.error('Error loading grade analysis:', err);
            }
        },
        
        init() {
            this.getRecap();
        }
    };
  }