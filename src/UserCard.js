import { Card, CardHeader, CardBody, CardFooter, Text, Button, Heading } from '@chakra-ui/react'

function UserCard(props) {
    const userData = props.userData
    return (
        <div>
            <Card>
                <CardHeader>
                    <Heading size='md'>{userData.username}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>hashed password: {userData.password}</Text>
                </CardBody>
                <CardFooter>
                    <Button>button doesn't work</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default UserCard;
