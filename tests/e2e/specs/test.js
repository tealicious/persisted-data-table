describe("Data Table", () => {
  describe("Initial Render", () => {
    it("Loads the app", () => {
      cy.visit("/");
    });

    it("Contains a table with an initial list of ten rows", () => {
      cy.get("table.table tbody tr")
        .its("length")
        .should("eq", 10);
    });
  });

  describe("Row Count Toggle", () => {
    it("Displays an amount of rows identical to the user's selected row count from the dropdown", () => {
      cy.get("select.custom-select")
        .select("25")
        .trigger("mousedown");
      cy.get("table.table tbody tr")
        .its("length")
        .should("eq", 25);
    });
  });

  describe("Search", () => {
    it("Displays results containing substring of search string", () => {
      let search = "Kyra";
      cy.get("input.searchbar")
        .clear()
        .type(search);
      cy.get("tr").contains(search);
    });

    it("Displays a no results found message when no results are found", () => {
      let search = "fhdjksalhfkasl";
      let message = `No results found for "${search}", please refine your search criteria.`;
      cy.get("input.searchbar")
        .clear()
        .type(search);
      cy.contains("p", message);
    });
  });

  describe("Edit Description", () => {
    it("Lets a user edit the discription for a given row by clicking OR tabbing into the cell", () => {
      cy.get("input.searchbar").clear();
      let newDesc = "my my, hey hey rock & roll is here to stay";
      cy.get("td.editable.Description")
        .first()
        .focus();
      cy.get("td.editable.Description textarea")
        .clear()
        .type(newDesc);
      cy.get("input.searchbar").click(); // quick and dirty clickaway
      cy.contains("td.editable.Description", newDesc);
    });
  });

  describe("Pagination Controls", () => {
    it("Displays the paginated results based on users selected page from the pagination controls", () => {
      cy.get("a.page-link")
        .contains("2")
        .click();
      cy.contains("td.Name", "Britanni Beck");
    });

    it("Paginates 1 page up on next", () => {
      cy.get("button.page-link")
        .contains("Next")
        .click();
      cy.contains("td.Name", "Connor Harding");
    });

    it("Paginates 1 page back on prev", () => {
      cy.get("button.page-link")
        .contains("Prev")
        .click();
      cy.contains("td.Name", "Britanni Beck");
    });
  });
});
