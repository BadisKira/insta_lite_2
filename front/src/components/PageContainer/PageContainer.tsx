import { Container, Grid } from '@mui/material'
import { useAuthContext } from '../../hooks/useAuthContext.hook'
import { LoaderIcon } from 'react-hot-toast'
import { FC } from 'react'


interface IProps {
    children: React.ReactNode
}

const PageContainer: FC<IProps> = ({
    children
}) => {
    const { isLoading } = useAuthContext()
    return (
        <>
            {isLoading ? 
                <Grid 
                    container 
                    justifyContent="center" 
                    alignItems="center" 
                    style={{ height: "100%" }}>
                        <LoaderIcon style={{ width: 40, height: 40 }} />
                </Grid>
                :
                <Grid 
                    container
                    direction="column"
                    style={{ minHeight: "100vh" , overflowX:"hidden"}}>
                       {children}
                </Grid>
            }
        </>
    )
}

export default PageContainer