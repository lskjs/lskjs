import { getIn } from 'formik';

export default (nextProps, prevProps) => (
  getIn(prevProps.formik.values, prevProps.name) !==
  getIn(nextProps.formik.values, prevProps.name) ||
  getIn(prevProps.formik.errors, prevProps.name) !==
  getIn(nextProps.formik.errors, prevProps.name) ||
  getIn(prevProps.formik.touched, prevProps.name) !==
  getIn(nextProps.formik.touched, prevProps.name) ||
  Object.keys(prevProps).length !== Object.keys(nextProps).length ||
  prevProps.formik.isSubmitting !== nextProps.formik.isSubmitting
);
