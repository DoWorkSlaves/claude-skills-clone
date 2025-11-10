'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import { Upload as UploadIcon, Send as SendIcon } from '@mui/icons-material';
import { Header } from '@/components/Layout/Header';
import { getAllCategories } from '@/data/skills';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SubmitPage() {
  const { t } = useLanguage();
  const categories = getAllCategories();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    author: '',
    repository: '',
    license: 'Apache-2.0',
    categories: [] as string[],
    tags: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      categories: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleLicenseChange = (event: SelectChangeEvent) => {
    setFormData({
      ...formData,
      license: event.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        description: '',
        author: '',
        repository: '',
        license: 'Apache-2.0',
        categories: [],
        tags: '',
      });
    }, 3000);
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            {t('submit.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('submit.subtitle')}
          </Typography>
        </Box>

        {/* Information Box */}
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {t('submit.guidelines')}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {t('submit.guidelinesIntro')}
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <li>{t('submit.guideline1')}</li>
            <li>{t('submit.guideline2')}</li>
            <li>{t('submit.guideline3')}</li>
            <li>{t('submit.guideline4')}</li>
            <li>{t('submit.guideline5')}</li>
          </Box>
        </Paper>

        {/* Submission Form */}
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Skill Name */}
              <TextField
                required
                fullWidth
                label={t('submit.skillName')}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('submit.skillNamePlaceholder')}
                helperText={t('submit.skillNameHelper')}
              />

              {/* Description */}
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label={t('submit.description')}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t('submit.descriptionPlaceholder')}
                helperText={t('submit.descriptionHelper')}
              />

              {/* Author */}
              <TextField
                required
                fullWidth
                label={t('submit.author')}
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder={t('submit.authorPlaceholder')}
                helperText={t('submit.authorHelper')}
              />

              {/* Repository URL */}
              <TextField
                fullWidth
                label={t('submit.repository')}
                name="repository"
                value={formData.repository}
                onChange={handleChange}
                placeholder={t('submit.repositoryPlaceholder')}
                helperText={t('submit.repositoryHelper')}
              />

              {/* Categories */}
              <FormControl fullWidth required>
                <InputLabel>{t('submit.categories')}</InputLabel>
                <Select
                  multiple
                  value={formData.categories}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput label={t('submit.categories')} />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* License */}
              <FormControl fullWidth required>
                <InputLabel>{t('submit.license')}</InputLabel>
                <Select
                  value={formData.license}
                  label={t('submit.license')}
                  onChange={handleLicenseChange}
                >
                  <MenuItem value="Apache-2.0">Apache 2.0</MenuItem>
                  <MenuItem value="MIT">MIT</MenuItem>
                  <MenuItem value="GPL-3.0">GPL 3.0</MenuItem>
                  <MenuItem value="BSD-3-Clause">BSD 3-Clause</MenuItem>
                  <MenuItem value="ISC">ISC</MenuItem>
                  <MenuItem value="Proprietary">Proprietary</MenuItem>
                  <MenuItem value="Source Available">Source Available</MenuItem>
                </Select>
              </FormControl>

              {/* Tags */}
              <TextField
                fullWidth
                label={t('submit.tags')}
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder={t('submit.tagsPlaceholder')}
                helperText={t('submit.tagsHelper')}
              />

              {/* Success Message */}
              {submitted && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {t('submit.success')}
                </Alert>
              )}

              {/* Submit Button */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  onClick={() =>
                    setFormData({
                      name: '',
                      description: '',
                      author: '',
                      repository: '',
                      license: 'Apache-2.0',
                      categories: [],
                      tags: '',
                    })
                  }
                >
                  {t('submit.clearForm')}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<SendIcon />}
                  disabled={!formData.name || !formData.description || !formData.author || formData.categories.length === 0}
                >
                  {t('submit.submitButton')}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>

        {/* Additional Info */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {t('submit.questions')} {t('submit.checkOur')}{' '}
            <Typography
              component="span"
              variant="body2"
              sx={{ color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('submit.checkGuidelines')}
            </Typography>{' '}
            {t('submit.or')}{' '}
            <Typography
              component="span"
              variant="body2"
              sx={{ color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('submit.contactUs')}
            </Typography>
            .
          </Typography>
        </Box>
      </Container>
    </>
  );
}
