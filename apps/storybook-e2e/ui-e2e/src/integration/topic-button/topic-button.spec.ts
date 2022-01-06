describe('ui: TopicButton component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=topicbutton--primary&args=name:React')
  );

  it('should render the component', () => {
    cy.get('h2').should('contain', 'React');
  });

  it('should correctly pass the topic name to the click event', () => {
    cy.get('h2').click();

    cy.get('span').should('contain', 'Clicked topic: React');
  });
});
