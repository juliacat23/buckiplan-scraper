import React from 'react';
import { Typography, makeStyles, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(4),
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant={'caption'}>
                Created by Julia Catalano . Data obtained from{' '}
                <Link
                    component="a"
                    href="https://registrar.osu.edu/courses//"
                    target="blank"
                >
                    OSU Course Catalog
                </Link>
                . View the project on{' '}
                <Link
                    component="a"
                    href="https://github.com/juliacat23/buckiplan"
                    target="blank"
                >
                    GitHub
                </Link>
                .
            </Typography>
        </div>
    );
};

export default Footer;
