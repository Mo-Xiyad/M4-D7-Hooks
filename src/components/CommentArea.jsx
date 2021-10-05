import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

class CommentArea extends Component {

    state = {
        comments: [], // comments will go here
        isLoading: false,
        isError: false
    }

    componentDidUpdate = async (prevProps) => {
        if (prevProps.asin !== this.props.asin) {
            this.setState({
                isLoading: true
            })

             const myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMjFlNjRiYjUzZDAwMTViMTllZDYiLCJpYXQiOjE2MzIzMTM4MzAsImV4cCI6MTYzMzUyMzQzMH0.TlCoWBwSkaUXG_HyFMfAQnvBaxp9w-P3yR9s7r6R1yE");

            try {
                let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + this.props.asin, {
                    headers: myHeaders
                })
                console.log(response)
                if (response.ok) {
                    let comments = await response.json()
                    this.setState({ comments: comments, isLoading: false, isError: false })
                } else {
                    console.log('error')
                    this.setState({ isLoading: false, isError: true })
                }
            } catch (error) {
                console.log(error)
                this.setState({ isLoading: false, isError: true })
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoading && <Loading />}
                {this.state.isError && <Error />}
                <AddComment asin={this.props.asin} />
                <CommentList commentsToShow={this.state.comments} />
            </div>
        )
    }
}

export default CommentArea