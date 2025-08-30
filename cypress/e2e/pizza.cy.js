describe("Pizza Sipariş Formu", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174/siparis");
  });

  it("İsim inputuna yazı girilebiliyor", () => {
    cy.get('[data-cy="input-name"]')
      .type("Kağanhan")
      .should("have.value", "Kağanhan");
  });

  it("Birden fazla malzeme seçilebiliyor", () => {
    cy.get('[data-cy="topping-Pepperoni"]').check();
    cy.get('[data-cy="topping-Mısır"]').check();
    cy.get('[data-cy="topping-Biber"]').check();

    cy.get('[data-cy="topping-Pepperoni"]').should("be.checked");
    cy.get('[data-cy="topping-Mısır"]').should("be.checked");
    cy.get('[data-cy="topping-Biber"]').should("be.checked");
  });

  it("Form başarıyla gönderiliyor", () => {
    // isim
    cy.get('[data-cy="input-name"]').type("Kağanhan");

    // boyut
    cy.get('[data-cy="size-orta"]').check();

    // hamur
    cy.get('[data-cy="select-dough"]').select("ince");

    // malzemeler (en az 4)
    cy.get('[data-cy="topping-Pepperoni"]').check();
    cy.get('[data-cy="topping-Mısır"]').check();
    cy.get('[data-cy="topping-Biber"]').check();
    cy.get('[data-cy="topping-Sucuk"]').check();

    // not
    cy.get('[data-cy="input-note"]').type("Çok sıcak olsun");

    // submit
    cy.get('[data-cy="submit-order"]').click();

    // Success sayfasına yönlendiğini kontrol et
    cy.url().should("include", "/tesekkurler");
    cy.contains("TEBRİKLER!").should("exist");
  });
});
