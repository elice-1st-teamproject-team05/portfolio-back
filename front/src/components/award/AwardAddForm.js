import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

const AwardAddForm = ({ portfolioOwnerId, setAwards, setIsAdding }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const handleSubmit = async (e) => {
    e.preventDefault();
    await Api.post("awards", {
      awardWhere: title,
      awardName: description,
      awardDate: date,
    });
    const res = await Api.get(`users/${portfolioOwnerId}/awards`);
    const update = res.data;
    setAwards(update);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle" className="mb-3">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mb-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Group as={Row} controlId="awardAddDate" className="mb-3">
          <Col>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </Col>
        </Form.Group>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default AwardAddForm;