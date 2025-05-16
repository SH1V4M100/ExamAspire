import { Exam } from '@/lib/types';

export const fetchExam = async (examId: number): Promise<Exam> => {
  try {
    // In a real app, this would be a fetch call to your API
    // For now, we'll simulate with a 500ms delay for the mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          title: "test exam",
          description: "tryna make this work",
          instructions: [],
          duration: 30,
          isNegativeMarkingEnabled: true,
          startDate: "2025-05-15T18:30:00.000Z",
          endDate: "2025-05-20T18:30:00.000Z",
          sections: [
            {
              id: "682727eb977bbd6e5ec78eaf",
              subject: "physics",
              questions: [
                {
                  id: "682727f0977bbd6e5ec78eb1",
                  questionText: "impossible question 1",
                  questionType: "single",
                  image: {
                    id: 3,
                    alt: null,
                    caption: null,
                    _key: "21V3gU8DoqvM5NTywW07MCGe4fFrHjamopkyEuDJK3RZAO0T",
                    updatedAt: "2025-05-16T11:57:05.254Z",
                    createdAt: "2025-05-16T11:57:03.572Z",
                    url: "https://images.pexels.com/photos/714699/pexels-photo-714699.jpeg",
                    thumbnailURL: null,
                    filename: "WIN_20250515_21_30_52_Pro-2.jpg",
                    mimeType: "image/jpeg",
                    filesize: 207964,
                    width: 1280,
                    height: 720,
                    focalX: 50,
                    focalY: 50
                  },
                  options: [
                    {
                      id: "68272818977bbd6e5ec78eb3",
                      text: "1",
                      isCorrect: true
                    },
                    {
                      id: "68272823977bbd6e5ec78eb5",
                      text: "2",
                      isCorrect: false
                    },
                    {
                      id: "68272828977bbd6e5ec78eb7",
                      text: "3",
                      isCorrect: false
                    },
                    {
                      id: "6827282d977bbd6e5ec78eb9",
                      text: "4",
                      isCorrect: false
                    }
                  ]
                }
              ]
            },
            {
              id: "68272835977bbd6e5ec78ebb",
              subject: "chemistry",
              questions: [
                {
                  id: "6827283c977bbd6e5ec78ebd",
                  questionText: "impossible question 2",
                  questionType: "multi",
                  image: null,
                  options: [
                    {
                      id: "6827284e977bbd6e5ec78ebf",
                      text: "1",
                      isCorrect: true
                    },
                    {
                      id: "68272855977bbd6e5ec78ec1",
                      text: "2",
                      isCorrect: true
                    },
                    {
                      id: "6827285a977bbd6e5ec78ec3",
                      text: "3",
                      isCorrect: false
                    },
                    {
                      id: "6827285e977bbd6e5ec78ec5",
                      text: "4",
                      isCorrect: false
                    }
                  ]
                },
                {
                  id: "68272866977bbd6e5ec78ec7",
                  questionText: "impossible question 3",
                  questionType: "single",
                  image: null,
                  options: [
                    {
                      id: "68272875977bbd6e5ec78ec9",
                      text: "1",
                      isCorrect: false
                    },
                    {
                      id: "6827287a977bbd6e5ec78ecb",
                      text: "2",
                      isCorrect: true
                    },
                    {
                      id: "68272882977bbd6e5ec78ecd",
                      text: "3",
                      isCorrect: false
                    },
                    {
                      id: "68272886977bbd6e5ec78ecf",
                      text: "4",
                      isCorrect: false
                    }
                  ]
                }
              ]
            },
            {
              id: "6827288e977bbd6e5ec78ed1",
              subject: "maths",
              questions: [
                {
                  id: "68272894977bbd6e5ec78ed3",
                  questionText: "impossible question 4",
                  questionType: "integer",
                  image: null,
                  options: [
                    {
                      id: "682728f5977bbd6e5ec78ee7",
                      text: "0",
                      isCorrect: false
                    },
                    {
                      id: "682728a6977bbd6e5ec78ed5",
                      text: "1",
                      isCorrect: false
                    },
                    {
                      id: "682728af977bbd6e5ec78ed7",
                      text: "2",
                      isCorrect: false
                    },
                    {
                      id: "682728b5977bbd6e5ec78ed9",
                      text: "3",
                      isCorrect: false
                    },
                    {
                      id: "682728b9977bbd6e5ec78edb",
                      text: "4",
                      isCorrect: false
                    },
                    {
                      id: "682728be977bbd6e5ec78edd",
                      text: "5",
                      isCorrect: true
                    },
                    {
                      id: "682728c4977bbd6e5ec78edf",
                      text: "6",
                      isCorrect: false
                    },
                    {
                      id: "682728c9977bbd6e5ec78ee1",
                      text: "7",
                      isCorrect: false
                    },
                    {
                      id: "682728ce977bbd6e5ec78ee3",
                      text: "8",
                      isCorrect: false
                    },
                    {
                      id: "682728d2977bbd6e5ec78ee5",
                      text: "9",
                      isCorrect: false
                    }
                  ]
                }
              ]
            }
          ],
          _status: "published",
          slug: "test-exam",
        });
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching exam:', error);
    throw error;
  }
};