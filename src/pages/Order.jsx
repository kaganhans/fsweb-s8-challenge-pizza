import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import { toast } from "react-toastify";

export default function Order() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [dough, setDough] = useState("");
  const [toppings, setToppings] = useState([]);
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const BASE_PRICE = 85.5;
  const extrasPrice = toppings.length * 5;
  const total = useMemo(() => (BASE_PRICE + extrasPrice) * qty, [toppings, qty]);

  const handleToggleTopping = (item) => {
    setToppings((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      toast.error("İsim en az 3 karakter olmalı.");
      return;
    }

    setSubmitting(true);

    const payload = { name, size, dough, toppings, note, qty, total };

    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", payload);
      toast.success("Siparişiniz alındı!");
      history.push("/tesekkurler");
    } catch (err) {
      console.error(err);
      toast.error("Sipariş gönderilemedi!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ background: "#faf7f2", minHeight: "100vh" }}>
      {/* 🔴 HEADER */}
      <header
        style={{
          background: "#CE2829",
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="/logo.svg" alt="Teknolojik Yemekler" style={{ height: 32 }} />
      </header>

      <div className="container" style={{ maxWidth: 900, padding: "32px 0" }}>
        <div style={{ color: "#5F5F5F", fontSize: 14, marginBottom: 16 }}>
          Anasayfa → Seçenekler → <strong>Sipariş Oluştur</strong>
        </div>

        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 8 }}>
          Position Absolute Acı Pizza
        </h2>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>85.50₺</div>
            <p style={{ color: "#5F5F5F", marginTop: 8, maxWidth: 600 }}>
              React geliştiricisi olarak hâlâ position:absolute
              konuşuyorsan bu pizza sana tam olur. Domates, peynir ve türlü
              malzemelerle zenginleşen bu lezzet; tek sayfa uygulamalar gibi hızlı,
              modüler ve doyurucu. Küçük bir pizzaya bazen pizzetta denir – ama biz
              komponentleri büyütmeyi seviyoruz.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 600 }}>4.9 ★</div>
            <div style={{ fontSize: 13, color: "#5F5F5F" }}>(200)</div>
          </div>
        </div>

        {/* FORM */}
        <Form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <Row>
            {/* Boyut */}
            <Col md={6}>
              <FormGroup tag="fieldset">
                <legend>Boyut Seç *</legend>
                {["Küçük", "Orta", "Büyük"].map((val) => (
                  <FormGroup check key={val}>
                    <Label check>
                      <Input
                        type="radio"
                        name="size"
                        value={val}
                        checked={size === val}
                        onChange={(e) => setSize(e.target.value)}
                        required
                      />{" "}
                      {val}
                    </Label>
                  </FormGroup>
                ))}
              </FormGroup>
            </Col>

            {/* Hamur */}
            <Col md={6}>
              <FormGroup>
                <Label>Hamur Seç *</Label>
                <Input
                  type="select"
                  value={dough}
                  onChange={(e) => setDough(e.target.value)}
                  required
                >
                  <option value="">Hamur Kalınlığı</option>
                  <option value="ince">İnce</option>
                  <option value="orta">Orta</option>
                  <option value="kalin">Kalın</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          {/* Ek Malzemeler */}
          <FormGroup>
            <Label>Ek Malzemeler (En fazla 10)</Label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {[
                "Pepperoni",
                "Domates",
                "Biber",
                "Sosis",
                "Mısır",
                "Sucuk",
                "Kanada Jambonu",
                "Ananas",
                "Tavuk",
                "Jalapeno",
                "Kabak",
                "Soğan",
                "Sarımsak",
              ].map((item) => (
                <Label key={item} check>
                  <Input
                    type="checkbox"
                    checked={toppings.includes(item)}
                    onChange={() => handleToggleTopping(item)}
                  />{" "}
                  {item}
                </Label>
              ))}
            </div>
          </FormGroup>

          {/* İSİM ALANI */}
          <FormGroup>
            <Label htmlFor="name">İsim *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Adınızı giriniz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>

          {/* NOT ALANI */}
          <FormGroup>
            <Label htmlFor="note">Sipariş Notu</Label>
            <Input
              type="textarea"
              id="note"
              rows="2"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </FormGroup>

          {/* ADET + ÖZET */}
          <Row className="align-items-center" style={{ marginTop: 16 }}>
            <Col md={6}>
              <div style={{ display: "inline-flex", gap: 8 }}>
                <Button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  -
                </Button>
                <div style={{ minWidth: 36, textAlign: "center", fontWeight: 700 }}>{qty}</div>
                <Button type="button" onClick={() => setQty((q) => q + 1)}>
                  +
                </Button>
              </div>
            </Col>
            <Col md={6} style={{ textAlign: "right" }}>
              <div
                style={{
                  background: "#fff",
                  padding: 16,
                  border: "1px solid #eee",
                  borderRadius: 8,
                  display: "inline-block",
                  minWidth: 220,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Sipariş Toplamı</div>
                <div style={{ fontSize: 14, color: "#5F5F5F" }}>
                  Seçimler: {extrasPrice.toFixed(2)}₺
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#CE2829" }}>
                  Toplam: {total.toFixed(2)}₺
                </div>
              </div>
            </Col>
          </Row>

          {/* SUBMIT */}
          <div style={{ marginTop: 24 }}>
            <Button
              type="submit"
              disabled={submitting}
              style={{
                background: "#FDC913",
                border: "none",
                fontWeight: 700,
                padding: "12px 24px",
                color: "#292929",
              }}
            >
              SİPARİŞ VER
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}
