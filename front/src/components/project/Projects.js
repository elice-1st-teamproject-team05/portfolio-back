import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

function Projects({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Api.get(`users/${portfolioOwnerId}/projects`).then((res) =>
      setProjects(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {projects.map((project) => (
          <Project
            key={project.number}
            portfolioOwnerId={portfolioOwnerId}
            project={project}
            setProjects={setProjects}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Col>
            <Row className="mt-3 text-center">
              <Col sm={{ span: 20 }} className="mb-4">
                <Button variant="primary" onClick={() => setIsAdding(true)}>
                  +
                </Button>
              </Col>
            </Row>
          </Col>
        )}
        {isAdding && (
          <ProjectAddForm
            setIsAdding={setIsAdding}
            setProjects={setProjects}
            portfolioOwnerId={portfolioOwnerId}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Projects;
