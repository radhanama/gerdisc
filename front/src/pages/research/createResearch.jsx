import { useEffect, useState } from "react";
import "../../styles/form.scss";
import { useNavigate, useParams } from "react-router";
import jwt_decode from "jwt-decode";
import Select from "../../components/select";
import BackButton from "../../components/BackButton";
import { getStudentById } from "../../api/student_service";
import { getProjectById } from "../../api/project_service";
import { getResearchers } from "../../api/researcher_service";
import ErrorPage from "../../components/error/Error";
import PageContainer from "../../components/PageContainer";
import { postResearch } from "../../api/research_service";

export default function ResearchForm() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [name,] = useState(localStorage.getItem('name'))
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [professorOptions, setProfessorOptions] = useState([]);
    const [externalResearchers, setExternalResearchers] = useState([]);
    const [coorientatorOptions, setCoorientatorOptions] = useState([]);
    const [student, setStudent] = useState({});
    const [project, setProject] = useState({});
    const [research, setResearch] = useState({
      dissertation: "",
      studentId: id,
      projectId: "",
      professorId: undefined,
      coorientatorId: undefined,
    });

    const setCoorientator = (id) => {
        setResearch({ ...research, coorientatorId: id });
      };
    

    const setOrientator = (id) => {
        setResearch({ ...research, orientatorId: id });
      };
    
  useEffect(() => {
    const fetchStudentAndProject = async () => {
      try {
        setIsLoading(true);
        const student = await getStudentById(id);
        setStudent(student);
        const project = await getProjectById(student?.projectId);
        setProject(project);
        setProfessorOptions(project?.professors?.map((p) => ({id: p.id, name:`${p.firstName} ${p.lastName}`})));
        const researchers = await getResearchers();
        setExternalResearchers(researchers);
        const options = researchers.map((r) => ({id: p.id, name:`${r.firstName} ${r.lastName}`}));
        setCoorientatorOptions(professorOptions.concat(options));
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    fetchStudentAndProject();
  }, [id]);

  useEffect(() => {
    const roles = ["Administrator"];
    const token = localStorage.getItem("token");
    try {
      const decoded = jwt_decode(token);
      if (!roles.includes(decoded.role)) {
        navigate("/");
      }
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const body = { ...research, projectId: student?.projectId };
      await postResearch(body);
      navigate(-1);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <PageContainer name={name} isLoading={isLoading}>
      <BackButton />
      {!error && student && project && (
        <div className="form">
          <div className="form-section">
          <Select
              className="formInput"
              defaultValue=""
              onSelect={setOrientator}
              options={[
                { value: "", label: "" },
                ...professorOptions.map((professor) => ({
                  value: professor.id,
                  label: professor.name,
                })),
              ]}
              label="Orientador"
              name="orientator"
            />
            <Select
              className="formInput"
              defaultValue=""
              onSelect={setCoorientator}
              options={[
                { value: "", label: "" },
                ...coorientatorOptions.map((researcher) => ({
                  value: researcher.id,
                  label: researcher.name,
                })),
              ]}
              label="Co-Orientador"
              name="coorientator"
            />
          </div>
          <div className="form-section">
            <div className="formInput">
              <input type="submit" value={"Submit"} onClick={handleSave} />
            </div>
          </div>
        </div>
      )}
      {error && <ErrorPage errorMessage={errorMessage} />}
    </PageContainer>
  );
}
