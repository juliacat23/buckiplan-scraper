import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Course {
        uid: Int
        course_id: Int
        subject: String
        course_name: String
        course_title: String
        units: Float
    }

    type Query {
        courses: [Course]!
    }
`;
