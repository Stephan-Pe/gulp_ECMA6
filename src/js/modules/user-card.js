class UserCard extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    set user(user) {
        this.root.innerHTML = `
        <style>
        .card-4 {
            transition: all 350ms ease-in;
            background-color: #091034;
            color: #FBA90A;
          }
          .card-4:hover, .card-4:focus {
            background-color: #FBA90A;
            color: #091034;
            transform: translateY(-1rem);
          }
          .avatar {
            display: flex;
            flex-direction: column;
            padding: 1rem;
          }
          @media (max-width: 24rem) {
            .avatar {
              flex-direction: row;
            }
          }
          .avatar__img {
            border-radius: 0.5rem;
            border: 5px solid #02f72e;
            overflow: hidden;
            width: 150px;
            aspect-ratio: 1/1;
            margin-bottom: auto;
          }
          .avatar__img img {
            width: 100%;
            object-fit: cover;
          }
          .avatar__content {
            margin-left: auto;
            border-bottom: 5px solid #02f72e;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          [class*=card-] {
            padding: 0.5rem 1rem;
            margin-bottom: 1rem;
            box-shadow: 5px 5px 5px #091034;
          }
        </style>
                <div id="${user.id}" class="card-4">
                    <div class="avatar">
                        <div class="avatar__img">
                            <img src="${user.avatar}" alt="${user.first_name + ' ' + user.last_name} "/>
                        </div>
                    
                       <div class="avatar__content">
                            <h2>Name: ${user.first_name}</h2>
                            <h3>Last name: ${user.last_name}</h3>
                            <h3>Email: ${user.email}</h3> 
                        </div>
                    </div>
                </div>
                `;
    }
}

customElements.define('user-card', UserCard);