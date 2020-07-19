import React from 'react';
import Board from './Board'

class App extends React.Component{


    render() {
        return (
            <div class="cover-container">
                <header class="masthead mb-auto">
                    <div class="navbar navbar-dark bg-dark box-shadow">
                        <div class="container d-flex justify-content-between">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            <a class="navbar-brand d-flex align-items-center" href="#">
                                <strong> Sudoku Solver</strong>
                            </a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse">
                                <span class="navbar-toggler-icon"/>
                            </button>

                        </div>

                    </div>
                </header>
                <main role="main">
                    <section class="jumbotron-heading">
                        <div class="container">
                            {/* <h1 class="humbotron-heading">Sudoku Solver</h1> */}
                            <p class="lead text-muted">
                                A random, solvable board will generated once 'New Board' is clicked. The solution will be shown when 'Solve' is clicked
                            </p>
                        </div>
                    </section>
                    <Board/>
                </main>   
          </div>
        )
    }
}

export default App